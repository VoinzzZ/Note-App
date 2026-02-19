import React from 'react'

const EmptyCard = ({ imgSrc, message}) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen -mt-20 text-center px-4'>
      <img src={imgSrc} alt='No notes' className='w-60 mb-5 opacity-90 dark:opacity-80' />
      
      <p className='max-w-xl text-sm font-medium text-slate-700 dark:text-slate-200 text-center leading-7'>
        {message}
      </p>
    </div>
  )
} 

export default EmptyCard
