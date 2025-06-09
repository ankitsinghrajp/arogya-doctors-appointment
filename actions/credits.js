"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {format} from "date-fns"
import { revalidatePath } from "next/cache";

//Define credit allocation per plan
const PLAN_CREDITS = {
    free_user: 0,
    standard: 10,
    premium: 24, 
}

const APPOINTMENT_CREDIT_COST = 2;

export async function checkAndAllocateCredits(user){
    try {

        if(!user){
            return null;
        }

        // Only allocate credits for patients 

        if(user.role !== "PATIENT"){
            return user;
        }

        const {has} = await auth();

        const hasBasic = has({plan: "free_user"});
        const hasStandard = has({plan: "standard"});
        const hasPremium = has({plan: "premium"});

        let currentPlan = null;
        let creditsToAllocate = 0;

        if(hasPremium){
            currentPlan = "premium";
            creditsToAllocate = PLAN_CREDITS.premium;
        }
        else if(hasStandard){
           currentPlan = "standard";
           creditsToAllocate = PLAN_CREDITS.standard;  
        }
        else if(hasBasic){
            currentPlan = "free_user";
            creditsToAllocate = PLAN_CREDITS.free_user;
        }


        if(!currentPlan){
            return user;
        }

        const currentMonth = format(new Date(), "yyyy-MM");

        if(user.transactions.length > 0){
            const latestTransaction = user.transactions[0];
            const transactionMonth = format(
                new Date(latestTransaction.createdAt),
                "yyyy-MM"
            );

            const transactionPlan = latestTransaction.packageId;

             //If we already allocate credits for this month and the plan is the same

             if(
                transactionMonth === currentMonth &&
                transactionPlan === currentPlan
             ){
                return user;
             }

        }

        const updatedUser = await db.$transaction(async(tx)=>{
            await tx.creditTransaction.create({
                data:{
                    userId: user.id,
                    amount: creditsToAllocate,
                    type: "CREDIT_PURCHASE",
                    packageId: currentPlan
                }
            })

            // Updated users credit balance
            const updatedUser = await tx.user.update({
                where:{
                    id: user.id,
                },
                data:{
                    credits:{
                        increment: creditsToAllocate,
                    },
                },
            });
               return updatedUser;
        });

        revalidatePath("/doctors");
        revalidatePath("/appointments");

        return updatedUser;

    } catch (error) {
        console.log("Failed to check subscription and allocate credits");
        return null;
    }
}



export async function deductCreditsForAppointment(userId, doctorId) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    const doctor = await db.user.findUnique({
      where: { id: doctorId },
    });

    // Ensure user has sufficient credits
    if (user.credits < APPOINTMENT_CREDIT_COST) {
      throw new Error("Insufficient credits to book an appointment");
    }

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    // Deduct credits from patient and add to doctor
    const result = await db.$transaction(async (tx) => {
      // Create transaction record for patient (deduction)
      await tx.creditTransaction.create({
        data: {
          userId: user.id,
          amount: -APPOINTMENT_CREDIT_COST,
          type: "APPOINTMENT_DEDUCTION",
        },
      });

      // Create transaction record for doctor (addition)
      await tx.creditTransaction.create({
        data: {
          userId: doctor.id,
          amount: APPOINTMENT_CREDIT_COST,
          type: "APPOINTMENT_DEDUCTION", // Using same type for consistency
        },
      });

      // Update patient's credit balance (decrement)
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          credits: {
            decrement: APPOINTMENT_CREDIT_COST,
          },
        },
      });

      // Update doctor's credit balance (increment)
      await tx.user.update({
        where: {
          id: doctor.id,
        },
        data: {
          credits: {
            increment: APPOINTMENT_CREDIT_COST,
          },
        },
      });

      return updatedUser;
    });

    return { success: true, user: result };
  } catch (error) {
    console.error("Failed to deduct credits:", error);
    return { success: false, error: error.message };
  }
}