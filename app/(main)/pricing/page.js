import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PricingTable } from '@clerk/nextjs'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PricingPage = () => {
  return (
    <div className='container mx-auto px-4 mb-5 py-6'>
        <div className='flex justify-start mb-2'>

            <Link href={'/'}
            className='flex items-center bg-red-950/20 hover:bg-red-950/40 px-5 py-2 text-sm font-bold rounded-md text-muted-foreground hover:text-white transition-colors'
            >
               <ArrowLeft className='h-4 w-4 mr-2'/>
               Back to Home
            </Link>
        </div>

        <div className='max-w-full mx-auto mb-12 text-center mt-3'>
        <Badge
        variant={'outline'}
        className={'bg-blue-900/30 border-blue-700/30 px-4 py-1 text-blue-400 text-sm font-medium mb-4'}
        >
            Affordable Price
        </Badge>

        <h1 className='text-4xl md:text-5xl font-bold text-transparent bg-clip-text pr-2 bg-gradient-to-b from-blue-500  to-blue-600  mb-4'>Clear Plans, No Surprises</h1>

        <p className='text-md text-muted-foreground'>Find the ideal consultation plan tailored to your healthcare needs — clear pricing, no hidden charges, and zero long-term obligations.</p>
        </div>
        <Card
              className={
                "border-blue-900/30 shadow-lg bg-gradient-to-b from bg-blue-950/30 to-transparent"
              }
            >
              <CardContent className={"p-6 md:p-8"}>
                <PricingTable checkoutProps={{
                  appearance:{
                    elements:{
                      drawerRoot: {
                        zIndex: 200
                      }
                    }
                  }
                }} />
              </CardContent>
            </Card>
    </div>
  )
}

export default PricingPage