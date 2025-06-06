"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DoctorFormSchema } from "@/lib/doctor-form-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const OnboardingPage = () => {
  const [step, setStep] = useState("choose-role");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(DoctorFormSchema),
    defaultValues: {
      speciality: "",
      experience: undefined,
      credentialUrl: "",
      description: "",
    },
  });

  const specialityValue = watch("speciality");

  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={'border-blue-900/90 bg-[#222427] hover:border-blue-700/30 shadow-md shadow-blue-600/10 cursor-pointer transition-all'}>
          <CardContent className={'pt-6 pb-6 flex flex-col items-center text-center'}>
            <div className="p-4 bg-blue-900/20 rounded-full mb-4">
            <User className="h-8 w-8 text-blue-400"/>
            </div>
            <CardTitle className={'text-2xl mb-2 font-bold text-white'}>Get started as a patient</CardTitle>
            <CardDescription className={'text-muted-foreground text-[16px]'}>Seamlessly connect with doctors, schedule visits, and take charge of your wellness journey.</CardDescription>
          </CardContent>
             <Button className={'mx-4 -mt-8'}>Continue as a Patient</Button>
           
         
        </Card>
      </div>
    );
  }

  if (step === "doctor-form") {
    return <>Doctor Form</>;
  }
};

export default OnboardingPage;
