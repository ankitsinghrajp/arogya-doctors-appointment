"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";


export async function setUserRole(formData){
      const {userId} = await auth();
      if(!userId){
        throw new Error("Unauthorized!");
      }

      const user = await db.user.findUnique({
            where:{
                clerkUserId: userId,
            }
      })

      if(!user){
        throw new Error("User not found!");
      }

      const role = formData.get("role");

      if(!role || !["PATIENT","DOCTOR"].includes(role)){
        throw new Error("Invalid role selection.");
      }

      try {

        if(role === "PATIENT"){
            await db.user.update({
                where:{
                    clerkUserId: userId,
                },

                data:{
                    role:"PATIENT",
                }
            });

            revalidatePath("/");
            return {success: true, redirect: "/doctors"};
        }

        if(role === "DOCTOR"){
            const speciality = formData.get("speciality");
            const experience = parseInt(formData.get("experience"),10);
            const credentialUrl = formData.get("credentialUrl");
            const description = formData.get("description");

            if(!speciality || !experience || !credentialUrl || !description){
                throw new Error("All fields are required!");
            }

            await db.user.update({
                where:{
                    clerkUserId: userId,
                },
                data:{
                    role: "DOCTOR",
                    speciality,
                    experience,
                    credentialUrl,
                    description,
                    verificationStatus: "PENDING",
                },
            });


            revalidatePath("/");
            return {success: true, redirect: "/doctor/verification"};
        }
        
      } catch (error) {
         console.log("This is the error",error);
          throw new Error("failed to update user profile!");
         
      }
} 


export async function getCurrentUser(){
    const {userId} = await auth();

    if(!userId) throw new Error("Unauthorized!");

    try {

        const user = await db.user.findUnique({
            where:{
                clerkUserId: userId,
            },
        })

        if(!user) throw new Error("User not found!");

        return user;
        
    } catch (error) {
        
        throw new Error("Failed to get user information!");
    }
}