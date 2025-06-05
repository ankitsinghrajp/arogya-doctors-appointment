import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='container mx-auto'>
        <div className='flex justify-center items-center mt-24'>
           {children}
        </div>
        
    </div>
  )
}

export default AuthLayout