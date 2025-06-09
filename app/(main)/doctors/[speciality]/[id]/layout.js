import { getDoctorById } from '@/actions/appointments';
import PageHeader from '@/components/page-header';
import { Stethoscope } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'

export async function generateMetadata({params}){
    const {id} = await params;
    const {doctor} = await getDoctorById(id);

    return {
        title: `Dr. ${doctor.name} - Arogya`,
        description: `Book an appointment with Dr. ${doctor.name} ${doctor.speciality} specialist with ${doctor.experience} years of experience.`
    }
}
const DoctorProfileLayout = async ({children,params}) => {
    const {id} = await params;
    const {doctor} = await getDoctorById(id);
   
  return (
    <div className='container mx-auto '>
        <PageHeader
          title={'Dr. '+ doctor.name}
          backLink={`/doctors/${doctor.speciality}`}
          backLabel={`Back to ${doctor.speciality}`}
          icon={<Stethoscope/>}
        />
        {children}
    </div>
  )
}

export default DoctorProfileLayout