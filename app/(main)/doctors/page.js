import { Card, CardContent } from '@/components/ui/card'
import { SPECIALTIES } from '@/lib/specialities'
import Link from 'next/link'
import React from 'react'

const SpecialitiesPage = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center mb-8 text-center'>
      <h1 className='text-3xl md:text-5xl font-extrabold  mb-2 text-transparent bg-clip-text pr-2 bg-gradient-to-b from-blue-500  to-blue-600'>Find Your Doctor</h1>
      <p className='text-muted-foreground text-lg'>
        Looking for something specific? Browse by specialty or see all doctors.
      </p>
    </div>

    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {SPECIALTIES.map((speciality)=>(
                  <Link key={speciality.name} href={`/doctors/${speciality.name}`}>
                    <Card className={'bg-[#222427] shadow-md shadow-black/50 border-blue-700/40 hover:border-blue-700/80 transition-all cursor-pointer h-full'}>
                        <CardContent className={'p-6 flex flex-col items-center justify-center text-center h-full'}>
                            <div className='w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center mb-4'>
                                <div>
                                    {speciality.icon}
                                </div>
                                </div>
                                <h3 className='font-medium text-white'>{speciality.name}</h3>
                            
                        </CardContent>
                    </Card>
                  </Link>
            ))}
    </div>
    </>
  )
}

export default SpecialitiesPage