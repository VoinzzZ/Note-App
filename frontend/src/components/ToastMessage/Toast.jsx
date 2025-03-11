import React from 'react'
import { LuCheck } from "react-icons/lu";

const Toast = ({ isShown, message, type, onClose }) => {
  return (
    <div>
      <div className='flex items-center gap-3 py-2 px-4'>
        <div className=''>
          <LuCheck className='text-xl text-green-500' />
        </div>
        <p className='text-sm text-slate-800'>Note Added Succesfully</p>
      </div>
    </div>
  )
}

export default Toast