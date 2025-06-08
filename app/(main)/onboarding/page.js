"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DoctorFormSchema } from "@/lib/doctor-form-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Stethoscope, User } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { setUserRole } from "@/actions/onboarding";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SPECIALTIES } from "@/lib/specialities";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const OnboardingPage = () => {
  const [step, setStep] = useState("choose-role");

  const router = useRouter();

  const { data, loading, fn: submitUserRole } = useFetch(setUserRole);

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

  const handlePatientSelection = async () => {
    if (loading) return;

    const formData = new FormData();
    formData.append("role", "PATIENT");

    await submitUserRole(formData);
  };


  useEffect(() => {
    if (data && data?.success) {
      toast.success("Role Selected...");
      router.push(data.redirect);
    }
  }, [data]);


  const onDoctorSubmit = async (data)=>{
          if(loading) return;

          const formData = new FormData();
          formData.append("role","DOCTOR");
          formData.append("speciality",data.speciality);
          formData.append("experience",data.experience.toString());
          formData.append("credentialUrl",data.credentialUrl);
          formData.append("description",data.description);

          await submitUserRole(formData);
  }


  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          onClick={() => !loading && handlePatientSelection()}
          className={
            "border-blue-900/90 bg-[#222427] hover:border-blue-700/30 shadow-md shadow-blue-600/10 cursor-pointer transition-all"
          }
        >
          <CardContent
            className={"pt-6 pb-6 flex flex-col items-center text-center"}
          >
            <div className="p-4 bg-blue-900/20 rounded-full mb-4">
              <User className="h-8 w-8 text-blue-400" />
            </div>
            <CardTitle className={"text-xl mb-2 font-bold text-white"}>
              Get started as a patient
            </CardTitle>
            <CardDescription className={"text-muted-foreground"}>
              Seamlessly connect with doctors, schedule visits, and take charge
              of your wellness journey.
            </CardDescription>
          </CardContent>
          <Button
            className={
              "mx-4 cursor-pointer font-semibold bg-blue-600 hover:bg-blue-700 text-white -mt-8"
            }
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Almost there...
              </span>
            ) : (
              <>Continue as a Patient</>
            )}
          </Button>
        </Card>

        <Card
          onClick={() => !loading && setStep("doctor-form")}
          className={
            "border-blue-900/90 bg-[#222427] hover:border-blue-700/30 shadow-md shadow-blue-600/10 cursor-pointer transition-all"
          }
        >
          <CardContent
            className={"pt-6 pb-6 flex flex-col items-center text-center"}
          >
            <div className="p-4 bg-blue-900/20 rounded-full mb-4">
              <Stethoscope className="h-8 w-8 text-blue-400" />
            </div>
            <CardTitle className={"text-xl mb-2 font-bold text-white"}>
              Get started as a doctor
            </CardTitle>
            <CardDescription className={"text-muted-foreground"}>
              Set up your practice, go live with your schedule, and connect with
              patients instantly
            </CardDescription>
          </CardContent>
          <Button
            disabled={loading}
            className={
              "mx-4 cursor-pointer bg-blue-600 hover:bg-blue-700 font-semibold text-white -mt-8"
            }
          >
            Continue as a Doctor
          </Button>
        </Card>
      </div>
    );
  }

  if (step === "doctor-form") {
    return (
      <Card className={"border-blue-900/90 bg-[#222427]"}>
        <CardContent className={"pt-6"}>
          <div className="mb-6">
            <CardTitle className={"text-2xl mb-2 font-bold text-white"}>
              Set Up Doctor Profile
            </CardTitle>
            <CardDescription className={"text-muted-foreground"}>
              Provide your professional information for account verification
            </CardDescription>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onDoctorSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="speciality">Medical Speciality</Label>
              <Select
                value={specialityValue}
                onValueChange={(value) => setValue("speciality", value)}
              >
                <SelectTrigger id="speciality" className="w-full bg-[#222427]">
                  <SelectValue placeholder="Select Your Speciality" />
                </SelectTrigger>
                <SelectContent className={"bg-[#222427]"}>
                  {SPECIALTIES.map((speciality) => {
                    return (
                      <SelectItem key={speciality.name} value={speciality.name}>
                        <div className={"flex items-center gap-2"}>
                          <span className="text-blue-400">
                            {speciality.icon}
                          </span>
                          {speciality.name}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.speciality && (
                <p className="text-sm font-medium text-red-500 ml-2 mt-1">
                  {errors.speciality.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years Of Experience</Label>
              <Input
                id="experience"
                type={"number"}
                placeholder="e.g. 2"
                {...register("experience", { valueAsNumber: true })}
              />

              {errors.experience && (
                <p className="text-sm font-medium text-red-500 ml-2 mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentialUrl">
                Link of Credential Documents
              </Label>
              <Input
                id="credentialUrl"
                type={"url"}
                placeholder="e.g. https://example.com/your-certificate.pdf"
                {...register("credentialUrl")}
              />

              {errors.credentialUrl && (
                <p className="text-sm font-medium text-red-500 ml-2 mt-1">
                  {errors.credentialUrl.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Please provide a link to your medical degree or certification
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Brief About Your Expertise
              </Label>
              <Textarea
                id="description"
                type={"text"}
                placeholder="Write about your experience, treatments, and patient care..."
                {...register("description")}
                row={4}
                className={'h-28'}
              />

              {errors.description && (
                <p className="text-sm font-medium text-red-500 ml-2 mt-1">
                  {errors.description.message}
                </p>
              )}
            
            </div>
            <div className="flex md:flex-row flex-col justify-center items-center gap-4 w-full">
              <Button 
              type="button"
              onClick={()=>setStep("choose-role")}
              disabled={loading}
              className={'bg-gray-700 w-full md:w-[48%] cursor-pointer hover:bg-gray-600 text-white text-sm'}
              >Go Back</Button>
              <Button 
              type="submit" 
              className={'bg-blue-600 w-full md:w-[48%] cursor-pointer text-sm hover:bg-blue-700 text-700'}>
                {loading? (
                  <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Submitting...
                  </div>
                ):<>Submit for verification</>}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
};

export default OnboardingPage;
