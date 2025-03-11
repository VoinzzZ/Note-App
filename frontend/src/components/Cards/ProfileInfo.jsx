import React from 'react'
import { getInitials } from '../../../utils/helper'

const Profileinfo = ({ userInfo, onLogout}) => {

  if(!userInfo) {
    return null;
  }

  return (
    <div className=' flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-black font-medium bg-slate-200'>
            {getInitials(userInfo.fullName)}
        </div>

        <div className=''>
            <p className='text-sm font-medium'>{userInfo.fullName}</p>
            <button className='underline text-slate-600' onClick={onLogout}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Profileinfo