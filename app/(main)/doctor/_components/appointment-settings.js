"use client";

import { setAvailabilitySlots } from "@/actions/doctor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import { format } from "date-fns";
import { AlertCircle, Clock, Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AppointmentSettings = ({ slots }) => {
  const [showForm, setShowForm] = useState(false);

  const { loading, fn: submitSlots, data } = useFetch(setAvailabilitySlots);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startTime: "",
      endTime: "",
    },
  });

  function createLocalDateFromTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    return date;
  }

  const onsubmit = async (data) => {
    if (loading) return;

    const formData = new FormData();

    const startDate = createLocalDateFromTime(data.startTime);
    const endDate = createLocalDateFromTime(data.endTime);

    if (startDate >= endDate) {
      toast.error("End time must be after start time.");
      return;
    }

    //Add to form data
    formData.append("startTime", startDate.toISOString());
    formData.append("endTime", endDate.toISOString());

    await submitSlots(formData);
  };

  const formatTimeString = (dateString)=>{
      try {
        return format(new Date(dateString), "h:mm a");
      } catch (error) {
         return "Invalid Time";
      }
  }

  useEffect(() => {
    if (data && data?.success) {
      setShowForm(false);
      toast.success("Availability slots updated successfully!");
    }
  }, [data]);

  return (
    <Card
      className={
        "bg-[#292a2d] border-blue-900/20 hover:border-blue-700/30 shadow-md shadow-black/40"
      }
    >
      <CardHeader>
        <CardTitle className={"text-xl font-bold text-white flex items-center"}>
          <Clock className="h-5 w-5 mr-2 text-blue-400" />
          Availability Settings
        </CardTitle>
        <CardDescription>
          Set your daily availability for patient appointments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showForm ? (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">
                Current Availability
              </h3>
              {slots.length === 0 ? (
                <p>
                  You haven&apos;t set any availability slots yet. Add your
                  availability to start accepting appointments.
                </p>
              ) : (
                <div>
                  {slots.map((slot) => {
                    return <div 
                    key={slot.id}
                    className="flex items-center p-3 rounded-md bg-[#222427] border border-blue-900/20 "
                    >
                      <div className="bg-blue-900/20 p-2 rounded-full mr-3">
                        <Clock className="h-4 w-4 text-blue-400" />
                      </div>

                      <p className="font-bold ">
                        {formatTimeString(slot.startTime)}{"  "}-{"  "} {formatTimeString(slot.endTime)}
                      </p>
                    </div>;
                  })}
                </div>
              )}
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className={
                "w-full text-white cursor-pointer bg-blue-600 hover:bg-blue-700"
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Set Availability Time
            </Button>
          </>
        ) : (
          <form
            className="space-y-4 border-2 border-gray-600/50 rounded-md p-4"
            onSubmit={handleSubmit(onsubmit)}
          >
            <h3 className="text-lg font-medium text-white mb-2">
              Set Daily Availability
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  {...register("startTime", {
                    required: "Start time is required",
                  })}
                  className={"bg-background border-blue-900/20"}
                />
                {errors.startTime && (
                  <span className="text-sm font-medium text-red-500">
                    {errors.startTime.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  {...register("endTime", { required: "End time is required" })}
                  className={"bg-background border-blue-900/20"}
                />
                {errors.endTime && (
                  <span className="text-sm font-medium text-red-500">
                    {errors.endTime.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setShowForm(false)}
                disabled={loading}
                className={"border-blue-900/30"}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className={
                  "bg-blue-600 cursor-pointer text-white hover:bg-blue-700"
                }
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Availability"
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-6 p-4 bg-muted/10 border border-blue-900/10 rounded-md">
          <h4 className="font-medium text-white mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-blue-400" />
            Understanding Availability
          </h4>
          <p className="text-muted-foreground text-sm">
            Define your daily availability so patients can schedule appointments
            during those times. The same schedule applies to all days. You can
            change your availability anytime — existing bookings will remain
            unchanged.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentSettings;
