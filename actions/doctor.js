"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function setAvailabilitySlots(formData){
    const {userId} = await auth();

    if(!userId) throw new Error("Unauthorized!");
    
    try {
        const doctor = await db.user.findUnique({
            where:{
                clerkUserId: userId,
                role: "DOCTOR",
            }
        })

        if(!doctor) throw new Error("Doctor Not Found!");

        //Get form data
        const startTime = formData.get("startTime");
        const endTime = formData.get("endTime");

        //Validate input 
        if(!startTime || !endTime){
            throw new Error("Start time and end time are required!");
        }

        if(startTime >= endTime){
            throw new Error("Start time must be before end time.");
        }

        const existingSlots = await db.availability.findMany({
            where: {
                doctorId: doctor.id,
            },
        });

        if(existingSlots.length > 0 ){
            const slotsWithNoAppointments = existingSlots.filter(
                (slot)=> !slot.appointment
            );

            if(slotsWithNoAppointments.length > 0){
                await db.availability.deleteMany({
                    where:{
                        id: {
                            in: slotsWithNoAppointments.map((slot)=>slot.id)
                        }
                    }
                });
            }
         }
            //Create new Availability Slots

            const newSlot = await db.availability.create({
                data:{
                    doctorId: doctor.id,
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                    status: "AVAILABLE",
                }
            });

     revalidatePath("/doctor");
     return {success: true, slot: newSlot};
        
    } catch (error) {
        console.log("Error",error);
          throw new Error("Failed to set availability!");
    }
}

export async function getDoctorAvailability(){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized!");

    try {
        const doctor = await db.user.findUnique({
            where:{
                clerkUserId: userId,
                role: "DOCTOR",
            },
        });

        if(!doctor) throw new Error("Doctor not found!");

        const availabilitySlots = await db.availability.findMany({
            where:{
                doctorId: doctor.id,
            },
            orderBy: {
                startTime: "asc",
            },
        });

        return {slots: availabilitySlots};
        
    } catch (error) {
        throw new Error("Failed to fetch availability slots");
    }
}

export async function getDoctorAppointments(){
    const {userId} = await auth();
    if(!userId) throw new Error("User not found!");

    try {
        const doctor = await db.user.findUnique({
            where:{
                clerkUserId: userId,
                role: "DOCTOR",
            },
        });

        if(!doctor) throw new Error("User not found!");

        const appointments = await db.appointment.findMany({
            where:{
                doctorId: doctor.id,
                status: {
                    in: ["SCHEDULED"],
                },
            },
            include:{
                patient: true,
            },
            orderBy:{
                startTime: "asc",
            },
        });

    return appointments;

    } catch (error) {
        throw new Error("Failed to fetch appointments: "+error.message);
    }
}

export async function cancelAppointment(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const appointmentId = formData.get("appointmentId");

    if (!appointmentId) {
      throw new Error("Appointment ID is required");
    }

    // Find the appointment with both patient and doctor details
    const appointment = await db.appointment.findUnique({
      where: {
        id: appointmentId,
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    // Verify the user is either the doctor or the patient for this appointment
    if (appointment.doctorId !== user.id && appointment.patientId !== user.id) {
      throw new Error("You are not authorized to cancel this appointment");
    }

    // Perform cancellation in a transaction
    await db.$transaction(async (tx) => {
      // Update the appointment status to CANCELLED
      await tx.appointment.update({
        where: {
          id: appointmentId,
        },
        data: {
          status: "CANCELLED",
        },
      });

      // Always refund credits to patient and deduct from doctor
      // Create credit transaction for patient (refund)
      await tx.creditTransaction.create({
        data: {
          userId: appointment.patientId,
          amount: 2,
          type: "APPOINTMENT_DEDUCTION",
        },
      });

      // Create credit transaction for doctor (deduction)
      await tx.creditTransaction.create({
        data: {
          userId: appointment.doctorId,
          amount: -2,
          type: "APPOINTMENT_DEDUCTION",
        },
      });

      // Update patient's credit balance (increment)
      await tx.user.update({
        where: {
          id: appointment.patientId,
        },
        data: {
          credits: {
            increment: 2,
          },
        },
      });

      // Update doctor's credit balance (decrement)
      await tx.user.update({
        where: {
          id: appointment.doctorId,
        },
        data: {
          credits: {
            decrement: 2,
          },
        },
      });
    });

    // Determine which path to revalidate based on user role
    if (user.role === "DOCTOR") {
      revalidatePath("/doctor");
    } else if (user.role === "PATIENT") {
      revalidatePath("/appointments");
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to cancel appointment:", error);
    throw new Error("Failed to cancel appointment: " + error.message);
  }
}

export async function addAppointmentNotes(formData){
    const {userId} = await auth();
    if(!userId) throw new Error("User not found!");

    try {
        const doctor = await db.user.findUnique({
            where:{
                clerkUserId: userId,
                role: "DOCTOR",
            },
        });

        if(!doctor) throw new Error("User not found!");
 

        const appointmentId = formData.get("appointmentId");
        const notes = formData.get("notes");

        const appointment = await db.appointment.findUnique({
            where:{
                id: appointmentId,
                doctorId: doctor.id,
            },
        });

        if(!appointment){
            throw new Error("Appointment not found!");
        }
        
        const updatedAppointment = await db.appointment.update({
            where:{
                id: appointmentId,
            },
            data:{
                notes,
            },
        });

        revalidatePath("/doctor");

        return {success:true,appointment: updatedAppointment};

    } catch (error) {
        throw new Error("Failed to update notes: "+ error.message);
    }
}

export async function markAppointmentCompleted(formData){
    const {userId} = await auth();
    if(!userId) throw new Error("User not found!");

    try {
        const doctor = await db.user.findUnique({
            where:{
                clerkUserId: userId,
                role: "DOCTOR",
            },
        });

        if(!doctor) throw new Error("User not found!");
 

        const appointmentId = formData.get("appointmentId");
        
        if(!appointmentId) throw new Error("Appointment Id not found!");


        const appointment = await db.appointment.findUnique({
            where:{
                id: appointmentId,
                doctorId: doctor.id,
            },
            include:{
                patient: true,
            }
        });

        if(!appointment){
            throw new Error("Appointment not found!");
        }

        if(appointment.status !== "SCHEDULED"){
            throw new Error("Only scheduled appointment can be marked as completed!");
        }
        
        
        const now = new Date();
        const appointmentEndTime = new Date(appointment.endTime);

        if(now < appointmentEndTime){
            throw new Error("Cannot mark appointment as completed before the scheduled end time");
        }

        const updatedAppointment = await db.appointment.update({
            where:{
                id: appointmentId,
            },
            data:{
                status:"COMPLETED",
            },
        });


        revalidatePath("/doctor");
        return {success: true, appointment: updatedAppointment};

    } catch (error) {
        throw new Error("Failed to update notes: "+ error.message);
    }
}