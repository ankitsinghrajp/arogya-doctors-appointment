
import { getDoctorsBySpeciality } from '@/actions/doctors-listing';
import DoctorCard from '@/components/doctor-card';
import PageHeader from '@/components/page-header'
import { Clock, HeartPulse } from 'lucide-react'
import { redirect } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

const SpecialityPage = async ({params}) => {
  const {speciality} = await params;

  if(!speciality) redirect("/doctors");

  const {doctors} = await getDoctorsBySpeciality(speciality);
    
  return (
    <div className='space-y-5'>
        <PageHeader 
        icon={<HeartPulse className=''/>}
        title={speciality.split('%20').join(' ')}
        backLink='/doctors' 
        backLabel='All Specialities'
        />

        {doctors && doctors.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
               {doctors.map((doctor)=>(
                  <DoctorCard key={doctor.id} doctor={doctor}/>
               ))}   
          </div>

        ):(
          <div className='text-center py-12'>
            <div className='flex justify-center mb-3 items-center'>
            <div className='p-5 bg-amber-900/20 rounded-full flex justify-center items-center'>
              <Clock className='h-8 text-amber-500 w-8 md:h-8 md:w-8'/>
            </div>
            </div>
            <h3 className='text-xl font-medium text-white mb-2'>
              No Verified Doctors Yet
            </h3>
            <p className='text-muted-foreground'>
             We couldn&apos;t find any verified doctors for this specialty at the moment. Please explore other specialties or check again soon.
            </p>
          </div>
        )}
    </div>
  )
}

export default SpecialityPage