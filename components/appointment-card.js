"use client";
import { generateVideoToken } from "@/actions/appointments";
import {
  addAppointmentNotes,
  cancelAppointment,
  markAppointmentCompleted,
} from "@/actions/doctor";
import useFetch from "@/hooks/use-fetch";
import {
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Loader2,
  Stethoscope,
  User,
  Video,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { format, formatDate, formatters } from "date-fns";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";

const AppointmentCard = ({ appointment, userRole }) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null); //cancel,notes,complete,video

  const [notes, setNotes] = useState(appointment.notes || "");

  const router = useRouter();

  const {
    loading: cancelLoading,
    fn: submitCancel,
    data: cancelData,
  } = useFetch(cancelAppointment);

  const {
    loading: notesLoading,
    fn: submitNotes,
    data: notesData,
  } = useFetch(addAppointmentNotes);

  const {
    loading: tokenLoading,
    fn: submitTokenRequest,
    data: tokenData,
  } = useFetch(generateVideoToken);

  const {
    loading: completeLoading,
    fn: submitMarkCompleted,
    data: completeData,
  } = useFetch(markAppointmentCompleted);

  const otherParty =
    userRole === "DOCTOR" ? appointment.patient : appointment.doctor;

  const otherPartyLabel = userRole === "DOCTOR" ? "Patient" : "Doctor";
  const otherPartyIcon = userRole === "DOCTOR" ? <User /> : <Stethoscope />;

  const formatDateTime = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy 'at' h:mm a");
    } catch (error) {
      return "Invalid Date";
    }
  };

  const formatTime = (dateString) => {
    try {
      return format(new Date(dateString), "h:mm a");
    } catch (error) {
      return "Invalid Time";
    }
  };

  const CanMarkComplete = () => {
    if (userRole !== "DOCTOR" || appointment.status !== "SCHEDULED") {
      return false;
    }

    const now = new Date();
    const appointmentEndTime = new Date(appointment.endTime);

    return now >= appointmentEndTime;
  };

  const handleMarkCompleted = async () => {
    if (completeLoading) return;

    if (
      window.confirm(
        "Are you sure you want to mark this appointment as completed? This action cannot be undone."
      )
    ) {
      const formData = new FormData();

      formData.append("appointmentId", appointment.id);
      await submitMarkCompleted(formData);
    }
  };

  useEffect(() => {
    if (completeData?.success) {
      toast.success("Appointment marked as completed!");
    }
  }, [completeData]);

  const isAppointmentActive = () => {
    const now = new Date();
    const appointmentTime = new Date(appointment.startTime);
    const appointmentEndTime = new Date(appointment.endTime);

    //Can join 30 minutes before start until end time
    return (
      (appointmentTime.getTime() - now.getTime() <= 30 * 60 * 1000 &&
        now < appointmentTime) ||
      (now >= appointmentTime && now <= appointmentEndTime)
    );
  };

  const handleJoinVideoCall = async () => {
    if (tokenLoading) return;

    setAction("Video");
    const formData = new FormData();
    formData.append("appointmentId", appointment.id);
    await submitTokenRequest(formData);
  };

  useEffect(() => {
    if (tokenData?.success) {
      router.push(
        `/video-call?sessionId=${tokenData.videoSessionId}&token=${tokenData.token}&appointmentId=${appointment.id}`
      );

    }
  }, [tokenData, appointment.id]);

  const handleSaveNotes = async ()=>{
        if(notesLoading || userRole !== "DOCTOR") return;

        const formData = new FormData();
        formData.append("appointmentId",appointment.id);
        formData.append("notes",notes);

        await submitNotes(formData);
  }

  useEffect(()=>{

    if(notesData?.success){
      toast.success("Notes saved successfully!");
      setAction(null);
    }

  },[notesData])

  const handleCancelAppointment = async ()=>{
    if(cancelLoading) return;

    if(window.confirm(
      "Are you sure you want to cancel this appointment? This action cannot be undone."
    )
  ){
    const formData = new FormData();
    formData.append("appointmentId",appointment.id);
    await submitCancel(formData);
  }
  };

  useEffect(()=>{

    if(cancelData?.success){
      toast.success("Appointment cancelled successfully! ");
      setOpen(false);
    }

  },[cancelData])

  return (
    <>
      <Card className={"bg-[#28282a] shadow-md shadow-black/20 rounded-md"}>
        <CardContent className={"px-4 py-2"}>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-start gap-3">
              {" "}
              <div className="bg-muted/20 rounded-full p-2 mt-1">
                {otherPartyIcon}
              </div>
              <div>
                <h3 className="font-medium text-white">
                  {userRole === "DOCTOR"
                    ? otherParty.name
                    : `Dr. ${otherParty.name}`}
                </h3>
                {userRole === "DOCTOR" && (
                  <p className="text-sm text-muted-foreground">
                    {otherParty.email}
                  </p>
                )}
                {userRole === "PATIENT" && (
                  <p className="text-sm text-muted-foreground">
                    {otherParty.speciality}
                  </p>
                )}

                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDateTime(appointment.startTime)}</span>
                </div>

                <div className="flex items-center mt-1 text-sm text-muted-foreground ">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {formatTime(appointment.startTime)} -{" "}
                    {formatTime(appointment.endTime)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 self-end md:self-start">
              <Badge
                variant={"outline"}
                className={
                  appointment.status === "COMPLETED"
                    ? "bg-blue-900/20 border-blue-900/30 text-blue-400 self-start"
                    : appointment.status === "CANCELLED"
                    ? "bg-red-900/20 border-red-900/30 text-red-400 self-start"
                    : "bg-amber-900/20 border-amber-900/30 text-amber-400 self-start"
                }
              >
                {appointment.status}
              </Badge>
              <div className="flex justify-center gap-2 flex-wrap items-center">
                {CanMarkComplete() && (
                  <Button
                    size={"sm"}
                    className={
                      "bg-blue-600 cursor-pointer text-white hover:bg-blue-700 "
                    }
                    onClick={handleMarkCompleted}
                    disabled={completeLoading}
                  >
                    {completeLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Complete
                      </>
                    )}
                  </Button>
                )}

                <Button
                  size={"sm"}
                  variant={"outline"}
                  className={"border-blue-900/30"}
                  onClick={() => setOpen(true)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment details dialog gone here */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={"bg-[#292a2d]"}>
          <DialogHeader>
            <DialogTitle className={"text-xl font-bold text-white"}>
              Appointment Details
            </DialogTitle>
            <DialogDescription>
              {appointment.status === "SCHEDULED"
                ? "Manage your upcoming appointment"
                : "View appointment information"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Other Party Information */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                {otherPartyLabel}
              </h4>
              <div className="flex gap-2 items-center">
                <div className="h-5 w-5 text-blue-400 mr-2">
                  {otherPartyIcon}
                </div>
                <div>
                  <p className="text-white font-medium">
                    {userRole === "DOCTOR"
                      ? otherParty.name
                      : `Dr. ${otherParty.name}`}
                  </p>
                  {userRole === "DOCTOR" && (
                    <p className="text-muted-foreground text-sm">
                      {otherParty.email}
                    </p>
                  )}
                  {userRole === "PATIENT" && (
                    <p className="text-muted-foreground text-sm">
                      {otherParty.specialty}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Appointment Time */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Scheduled Time
              </h4>
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-400 mr-1" />
                  <p className="text-white">
                    {formatDateTime(appointment.startTime)}
                  </p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-400 mr-1" />
                  <p className="text-white">
                    {formatTime(appointment.startTime)} -{" "}
                    {formatTime(appointment.endTime)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Status
              </h4>
              <Badge
                variant={"outline"}
                className={
                  appointment.status === "COMPLETED"
                    ? "bg-blue-900/20 border-blue-900/30 text-blue-400 "
                    : appointment.status === "CANCELLED"
                    ? "bg-red-900/20 border-red-900/30 text-red-400"
                    : "bg-amber-900/20 border-amber-900/30 text-amber-400"
                }
              >
                {appointment.status}
              </Badge>
            </div>

            {appointment.patientDescription && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  {userRole === "DOCTOR"
                    ? "Patient Description"
                    : "Your Description"}
                </h4>
                <div className="p-3 rounded-md bg-[#28282a] shadow-md shadow-black/20 border border-blue-900/20">
                  <p className="text-white whitespace-pre-line">
                    {appointment.patientDescription}
                  </p>
                </div>
              </div>
            )}

            {appointment.status === "SCHEDULED" && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Video Consultation
                </h4>

                <Button
                className={`w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity cursor-pointer hover:text-white text-white ${!isAppointmentActive && 'cursor-not-allowed'}`}
                disabled={
                  !isAppointmentActive() || action === "video" || tokenLoading
                }
                onClick={handleJoinVideoCall}
                >
                  {tokenLoading || action === "video"? (
                    <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin"/>
                    Preparing Video Call...
                    </>
                  ):(
                    <>
                    <Video className="h-4 w-4 mr-1"/>
                    {isAppointmentActive() ? "Join Video Call":"Video Call Available 30 mins before"}
                    </>
                  )}

                </Button>
              </div>
            )}


            <div className="space-y-2">

              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Doctor Notes
                </h4>
                {userRole === "DOCTOR" && action!== 'notes' && appointment.status !== "CANCELLED" && (
                  <Button
                  variant={'ghost'}
                  size={'sm'}
                  onClick={() => setAction("notes")}
                  className={'h-7 text-blue-400 cursor-pointer hover:text-blue-300 '}
                  >
                    <Edit className="h-4 w-4 mr-1"/>
                    {appointment.notes? "Edit":"Add"}

                  </Button>
                )}
              </div>

              {userRole === "DOCTOR" && action === "notes" ? (<div className="space-y-3">
                        <Textarea
                        value={notes}
                        onChange={(e)=> setNotes(e.target.value)}
                        placeholder="Enter your clinical notes here..."
                        className={'bg-background border-blue-900/20 min-h-[100px]'}
                        />
                        <div className="flex justify-end items-center space-x-4">
                      <Button
                      type="button"
                      variant={'outline'}
                      size={'sm'}
                      onClick={()=>{
                        setAction(null);
                        setNotes(appointment.notes || "");
                      }}
                      disabled={notesLoading}
                      className={'border-blue-900/30 text-sm cursor-pointer'}
                      >
                       Cancel
                        </Button>

                        <Button
                        size={'sm'}
                        onClick={handleSaveNotes}
                        disabled={notesLoading}
                        className={'bg-blue-600 cursor-pointer text-white text-sm hover:bg-blue-700'}
                  
                        >

                          {notesLoading ? (
                            <>
                            <Loader2 className="mr-1 h-4 w-4 text-white animate-spin"/>
                            Saving...
                            </>
                          ):(
                            "Save Notes"
                          )}

                        </Button>

                        </div>
              </div>):(
                <div className="p-3 rounded-md bg-[#28282a] shadow-md shadow-black/20 border border-blue-900/20 min-h-[80px]">
                  {appointment.notes ?(
                    <p className="text-muted-foreground text-sm whitespace-pre-line">
                         {appointment.notes}
                    </p>
                  ):(
                    <p className="text-muted-foreground tex-sm italic">
                         No notes added yet
                    </p>
                  )}

                </div>
              )}

            </div>
          </div>
          <DialogFooter className={'flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2'}>
                 {/* Cancel button for scheduled appointments */}
                 {appointment.status === "SCHEDULED" && (
                  <Button
                  variant={'outline'}
                  onClick={handleCancelAppointment}
                  disabled={cancelLoading}
                  className={'border-red-900/30 w-full cursor-pointer text-red-400 hover:text-red-400 hover:bg-red-900/40 mt-3 sm:mt-0'}
                  >
                    {cancelLoading ?(
                      <>
                      <Loader2 className="mr-1 h-4 w-4 animate-spin"/>
                      Cancelling...
                      </>
                    ):(
                      <>
                      <X className="h-4 w-4 mr-1"/>
                      Cancel Appointment
                      </>
                    )}
                  </Button>
                 )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentCard;
