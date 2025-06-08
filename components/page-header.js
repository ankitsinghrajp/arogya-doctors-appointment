import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'

const PageHeader = ({
    icon,
    title,
    backLink = "/",
    backLabel = "Back to Home",
}) => {
  return (
    <div className='flex flex-col justify-between gap-5 mb-8'>
        <Link className='' href={backLink}>
        <Button
        variant={'outline'}
        size={'sm'}
        className={'mb-2 cursor-pointer border-blue-900/30'}
        >
         <ArrowLeft className='h-4 w-4 mr-2'/>
         {backLabel}
        </Button>
        </Link>

        <div className='flex items-end gap-2'>
              {icon && (
                <div className='text-blue-400 flex items-center gap-2'>
                    {React.cloneElement(icon,{
                        className: "h-8 md:h-14 w-8 md:w-14",
                    })}
                  <h1 className='text-3xl font-extrabold md:text-5xl text-transparent bg-clip-text pr-2 bg-gradient-to-b from-blue-500  to-blue-600'>{title}</h1>
                </div>
              )}
        </div>
    </div>
  )
}

export default PageHeader