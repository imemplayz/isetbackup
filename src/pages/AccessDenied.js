import React from 'react'

function AccessDenied() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center font-sans'>
        <h1 className=' text-[150px] font-bold text-slate-700'>403</h1>
        <h2 className='text-[25px] font-bold text-red-500'>Access Denied</h2>
        </div>
  )
}

export default AccessDenied