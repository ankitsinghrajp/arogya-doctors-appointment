
"use client";
import { updateDoctorStatus } from "@/actions/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useFetch from "@/hooks/use-fetch";
import { format } from "date-fns";
import { Check, ExternalLink, FileText, Medal, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {BarLoader} from "react-spinners"

const PendingDoctors = ({ doctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const {
    loading,
    data,
    fn: submitStatusUpdate,
  } = useFetch(updateDoctorStatus);

  const handleUpdateStatus = async (doctorId,status)=>{
         if(loading) return;

         const formData = new FormData();
         formData.append("doctorId",doctorId);
         formData.append("status",status);

         await submitStatusUpdate(formData);
  }

  useEffect(()=>{
     if(data && data?.success){
        
        handleCloseDialog();
     }
  },[data])


  const handleViewDetails = (doctor)=>{
       setSelectedDoctor(doctor);
  }

  const handleCloseDialog = ()=>{
    setSelectedDoctor(null);
  }

  return (
        <div>

           <Card className ="bg-[#222427] border-blue-900/20">
  <CardHeader>
    <CardTitle className="text-xl font-bold text-white">Pending Doctor Verifications</CardTitle>
    <CardDescription>Review and approve doctor applications</CardDescription>

  </CardHeader>
  <CardContent>
    {doctors.length === 0? <div className="text-center py-8 text-muted-foreground">
         No pending verification requests at this time.
    </div>:<div className="space-y-4 ">
             {doctors.map((doctor)=>(
                <Card key={doctor.id} className={'bg-[#292a2d] border-blue-900/20 hover:border-blue-700/30 transition-all'}>
                    <CardContent className={'p-4 '}>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">

                                <div className="bg-black/10 rounded-full p-2">
                                  <User className="h-5 w-5 text-blue-400 "/>
                                </div>
                                <div className="mt-2">
                                    <h3 className="font-medium text-white">
                                        {doctor.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {doctor.speciality} • {doctor.experience} years experience
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 self-end md:self-auto">
                                <Badge
                                variant={'outline'}
                                className={'bg-amber-900/20 border-amber-900/30 text-amber-400'}
                                >
                                       Pending
                                </Badge>
                                <Button
                                variant={'outline'}
                                size={'sm'}
                                onClick ={()=>handleViewDetails(doctor)}
                                className={'border-blue-900/30 hover:bg-muted/80'}
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>

                    </CardContent>
                </Card>
             ))}
        </div>
        }
  </CardContent>
</Card>

     {selectedDoctor && (
        <Dialog className="" open={!!selectedDoctor} onOpenChange={handleCloseDialog}>
  <DialogContent className={' !max-w-3xl bg-[#222427]'}>
    <DialogHeader>
      <DialogTitle className={'text-xl font-bold text-white'}>Doctor Verification Details</DialogTitle>
      <DialogDescription>
        Review the doctor&apos;s information carefully before making a decision.
      </DialogDescription>
    </DialogHeader>
      <div className="space-y-6 py-4">
        <div className="flex flex-col md:flex-row  gap-6">
            <div className="space-y-1 flex-1">
                <h4 className="text-sm font-medium text-muted-foreground"
                >Full Name</h4>
                <p className="text-base font-medium text-white">
                    {selectedDoctor.name}
                </p>
            </div>

            <div className="space-y-1 flex-1">
                <h4 className="text-sm font-medium text-muted-foreground"
                >Email</h4>
                <p className="text-base font-medium text-white">
                     {selectedDoctor.email}
                </p>
            </div>

            <div className="space-y-1 flex-1">
                <h4 className="text-sm font-medium text-muted-foreground"
                >Application Date</h4>
                <p className="text-base font-medium text-white">
                     {format(new Date(selectedDoctor.createdAt),"PPP")}
                </p>
            </div>
        </div>
                <Separator className={'bg-blue-500/40'}/>

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Medal className="h-5 w-5 text-blue-400"/>
                         <h3 className="text-white font-medium">
                            Professional Information
                         </h3>
                    </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 ">
                    <div className="space-y-1">
                        <h4
                        className="text-sm font-medium text-muted-foreground"
                        >Speciality
                        </h4>
                        <p className="text-white">{selectedDoctor.speciality}</p>
                    </div>

                    <div className="space-y-1">
                        <h4
                        className="text-sm font-medium text-muted-foreground"
                        >Years of Experience
                        </h4>
                        <p className="text-white">{selectedDoctor.experience} years</p>
                    </div>

                    <div className="space-y-1 col-span-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Credentials
                          </h4>
                          <div className="flex items-center">
                                <a href={selectedDoctor.credentialUrl} target="_blank" rel="noopener noreferer"
                                className="text-blue-400 hover:text-blue-300 flex items-center">
                                    View Credentials
                                    <ExternalLink className="h-4 w-4 ml-1"/>
                                </a>
                          </div>
                    </div>

                </div>

      </div>
      <Separator className={'bg-blue-500/40'}/>
      <div className="space-y-2 ">
        <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400"/>
            <h3 className="text-white font-medium">
                Service Description
            </h3>
        </div>
        <p className="text-muted-foreground whitespace-pre-line">{selectedDoctor.description}</p>

      </div>
      </div>
      {loading && <BarLoader width="100%" color="#36d7b7"/>}
      <DialogFooter className={'flex sm:justify-between'}>
        <Button
        variant={'destructive'}
        disabled={loading}
        className={'bg-red-600 cursor-pointer flex items-center gap-2 hover:bg-red-700'}
        onClick={()=>handleUpdateStatus(selectedDoctor.id, "REJECTED")}
        >
           <X className=" h-4 w-4"/>
           Reject
        </Button>

        <Button
        disabled={loading}
        className={'bg-blue-600 cursor-pointer text-white flex items-center gap-2 hover:bg-blue-700'}
        onClick={()=> handleUpdateStatus(selectedDoctor.id,"VERIFIED")}
        >
         <Check className=" h-4 w-4"/>
         Approve
        </Button>
      </DialogFooter>
  </DialogContent>
</Dialog>
     )}

       </div>
  );
};

export default PendingDoctors;