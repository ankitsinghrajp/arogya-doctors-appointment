"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Medal,
  User,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import AppointmentForm from "@/app/(main)/doctors/[speciality]/[id]/_components/appointment-form";
import { useRouter } from "next/navigation";
import SlotPicker from "@/app/(main)/doctors/[speciality]/[id]/_components/slot-picker";

const DoctorProfile = ({ doctor, availableDays }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const router = useRouter();
  if(!doctor){
     console.log("No doctor found");
  }
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const toggleBooking = () => {
    setShowBooking(!showBooking);

    if (!showBooking) {
      setTimeout(() => {
        document.getElementById("booking-section")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const totalSlots = availableDays.reduce(
    (total, day) => total + (day.slots?.length || 0),
    0
  );

  const handleBookingComplete = ()=>{
      router.push('/appointments')
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left one  */}
      <div className="md:col-span-1 ">
        <div className="md:sticky md:top-24 ">
          <Card
            className={
              "border-blue-900/90 shadow-md shadow-black/50 bg-[#292a2d]"
            }
          >
            <CardContent className={"pt-6"}>
              <div className="flex flex-col text-center items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-blue-900/20 ">
                  {doctor.imageUrl ? (
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      fill="true"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center ">
                      <User className="h-16 w-16 text-blue-400" />
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Dr. {doctor.name}
                </h2>
                <Badge
                  variant={"outline"}
                  className={
                    "bg-blue-900/20 border-blue-900/30 text-blue-400 mb-4"
                  }
                >
                  {doctor.speciality}
                </Badge>
                <div className="flex items-center justify-center mb-2">
                  <Medal className="h-4 w-4 text-blue-400 mr-2" />
                  <span className="text-muted-foreground">
                    {doctor.experience} years experience
                  </span>
                </div>
                <Button
                  onClick={toggleBooking}
                  className={
                    "w-full bg-blue-600 hover:bg-blue-700 mt-1 text-white"
                  }
                >
                  {showBooking ? (
                    <>
                      Hide Booking
                      <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Book Appointment
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* right one */}
      <div className="md:col-span-2 space-y-6">
        <Card
          className={
            "border border-blue-900/80 bg-[#292a2d] shadow-md shadow-black/50"
          }
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">
              About Dr. {doctor.name}
            </CardTitle>
            <CardDescription>{doctor.speciality}</CardDescription>
          </CardHeader>
          <CardContent className={'space-y-6'}>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <h3 className="text-white font-medium">Description</h3>
              </div>
              <p className="text-muted-foreground whitespace-pre-line">
                {doctor.description}
              </p>

              <Separator className={"bg-blue-900/70"} />
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <h3 className="text-white font-medium">Availability</h3>
                </div>
              </div>
            </div>

            {totalSlots > 0 ? (
              <div className="flex items-center mt-2">
                <Calendar className="h-5 w-5  text-blue-400 mr-2" />
                <p className="text-muted-foreground">
                  {totalSlots} time slots are available for booking over the
                  next 4 days.
                </p>
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No available slots for next 4 days. Please check back later.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {showBooking && (
          <div id="booking-section">
            <Card className={'border-blue-900/80 shadow-md shadow-black/50 bg-[#292a2d]'}>
              <CardHeader>
                <CardTitle className={'text-xl font-bold text-white'}>Book an Appointment</CardTitle>
               <CardDescription>Select a time slot and provide details for your consultation.</CardDescription>
              </CardHeader>
              <CardContent>
                {totalSlots > 0? 
                <>
                {!selectedSlot && <SlotPicker
                   days={availableDays}
                   onSelectedSlot ={handleSlotSelect}
                />}
                {selectedSlot && <AppointmentForm
                doctorId ={doctor.id}
                slot={selectedSlot}
                onBack={()=> setSelectedSlot(null)}
                onComplete={handleBookingComplete}
                />}
                </>:

                <div className="text-center py-6">
                  <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-3"/>
                  <h3 className="text-xl font-medium text-white mb-2">
                    No available slots
                  </h3>
                   <p>This doctor doesn&apos;t have any available appointment slots for the next 4 days. Please check back later or try another doctor.</p>
                </div>
                }
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
