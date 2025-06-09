import { getAvailableTimeSlots, getDoctorById } from '@/actions/appointments';
import DoctorProfile from '@/components/doctor-profile';
import { redirect } from 'next/navigation';
import React from 'react'

const DoctorsProfilePage = async ({params}) => {
    const {id} = await params;
    
    try {
        
        const [doctorData,slotsData] = await Promise.all([
            getDoctorById(id),
            getAvailableTimeSlots(id),
        ])
        return (<DoctorProfile
           doctor={doctorData.doctor}
           availableDays={slotsData.days || []}
        /> );   
    } catch (error) {

        console.log("Error loading doctor profile");
        redirect("/doctors");
        
    }
}

export default DoctorsProfilePage