import { bookAppointment } from '@/actions/appointments';
import useFetch from '@/hooks/use-fetch';
import { format } from 'date-fns';
import { Calendar, Clock, CreditCard } from 'lucide-react';
import React, { useState } from 'react'

const AppointmentForm = ({doctorId,slot,onBack, onComplete}) => {

  const [description,setDescription] = useState("");

  const {loading,data, fn:submitBooking} = useFetch(bookAppointment);

  return (
    <form className='space-y-6'>
      <div className='bg-muted/20 p-4 rounded-lg border border-blue-900/30 space-y-3'>
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
    </form>
  )
}

export default AppointmentForm