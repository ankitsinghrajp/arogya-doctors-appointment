import {z} from "zod"
export const DoctorFormSchema = z.object({
     speciality: z.string().min(1,"Speciality is required!"),
     experience: z.number()
     .min(1,"Experience must be atleast 1 year")
     .max(50,"Experience must be less than 50 years"),
     credentialUrl: z.string().url("Please enter a valid URL")
     .min(1,"Credential URL is required"),
     description: z.string().min(20,"Description must be atleast 20 characters")
     .max(1000,"Description cannot exceed 1000 characters"),
})