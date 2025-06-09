import AppointmentCard from "@/components/appointment-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import React from "react";

const DoctorsAppointmentList = ({ appointments }) => {

  return (
    <Card className={'bg-[#292a2d] shadow-md shadow-black/50 border-blue-900/20'}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-400"/>
            Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
      {appointments.length > 0?
      ( <div className="space-y-4">
        {appointments.map((appointment)=>(
            <AppointmentCard key={appointment.id} appointment={appointment} userRole="DOCTOR"/>

        ))}
           
      </div>):
      (<div className="text-center py-8">
         <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3 "/>
         <h3 className="text-xl font-medium text-white mb-2">No upcoming Appointments</h3>
         <p className="text-muted-foreground">
            You don&apos;t have any scheduled appointment yet. Make sure you&apos;ve set your availability to allow patient to book.
         </p>
      </div>)
      }
      </CardContent>
    </Card>
  );
};

export default DoctorsAppointmentList;
