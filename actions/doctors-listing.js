"use server"

import { db } from "@/lib/prisma"

export async function getDoctorsBySpeciality(speciality){
     try {

        const doctors = await db.user.findMany({
            where:{
                role:"DOCTOR",
                verificationStatus: "VERIFIED",
                speciality: speciality.replace("%20"," "),
            },
            orderBy:{
                name: "asc",
            }
        });

        return {doctors}
        
     } catch (error) {
        return {error: "Failed to fetch doctors"}
     }
}