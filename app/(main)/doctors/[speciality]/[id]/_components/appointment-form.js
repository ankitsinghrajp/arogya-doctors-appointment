"use client"
import { bookAppointment } from '@/actions/appointments';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useFetch from '@/hooks/use-fetch';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, CreditCard, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';


const AppointmentForm = ({doctorId,slot,onBack, onComplete}) => {

  const [description,setDescription] = useState("");

  const {loading,data, fn:submitBooking} = useFetch(bookAppointment);


  const handleSubmit = async(e)=>{
     e.preventDefault();

     const formData = new FormData();
     formData.append("doctorId",doctorId);
     formData.append("startTime",slot.startTime);
     formData.append("endTime",slot.endTime);
     formData.append("description",description);

     await submitBooking(formData);
  };

  useEffect(()=>{
    if(data){
      if(data.success){
        toast.success("Appointment booked successfully");
        onComplete();
      }
    }
  },[data])

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <div className='bg-muted/20 p-4 shadow-md shadow-black/20 rounded-lg border border-blue-900/30 space-y-3'>
      <div className='flex items-center'>
         <Calendar className='h-5 w-5 text-blue-400 mr-2'/>
         <span className='text-white font-medium'>
          {format(new Date(slot.startTime),"EEEE, MMMM d, yyyy")}
         </span>
      </div>
       <div className='flex items-center'>
        <Clock className='h-5 w-5 text-blue-400 mr-2'/>
        <span className='text-white'>
          {slot.formatted}
        </span>

       </div>
       <div className='flex items-center'>
        <CreditCard className='h-5 w-5 text-blue-400 mr-2'/>
        <span className='text-muted-foreground'>
          Cost: <span className='text-white font-medium'> 2 credits</span>
        </span>

       </div>
      </div>

      <div className='space-y-2'>
        <Label className={'text-lg font-medium text-gray-200'} htmlFor = "description">
            What Brings You In? (Optional)
        </Label>

        <Textarea 
          id={'description'}
          placeholder="Briefly describe your medical concern or reason for the appointment..."
          className={'bg-muted/20 pt-3 pl-3 shadow-md shadow-black/30 border-blue-900/20 h-32'}
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
        <p className='text-muted-foreground text-xs'>*This information will be shared with the doctor before your appointment.</p>

      </div>

      <div className='flex justify-between pt-2 px-2'>
        <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className={'border-blue-900/30'}
        >
          <ArrowLeft className='mr-1 h-4 w-4'/>
            Change Time Slot
        </Button>
        <Button
        type="submit"
        disabled={loading}
        className={'bg-blue-600 text-white hover:bg-blue-700'}
        >
         {loading?(
          <>
          <Loader2 className='mr-1 h-4 w-4 text-white animate-spin'/>
          Booking
          </>
         ):("Confirm Booking")}
        </Button>
      </div>
    </form>
  )
}

export default AppointmentForm