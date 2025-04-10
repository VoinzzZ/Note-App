import React from 'react'

const EmptyCard = ({ imgSrc, message}) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen -mt-20'>
      <img src={imgSrc} alt='No notes' className='w-60 mb-5' />
      
      <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7'>
        {message}
      </p>
    </div>
  )
} 

export default EmptyCard