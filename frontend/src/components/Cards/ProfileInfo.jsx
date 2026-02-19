import React from 'react'
import { getInitials } from '../../../utils/helper'

const Profileinfo = ({ userInfo, onLogout}) => {

  if(!userInfo) {
    return null;
  }

  return (
    <div className=' flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-black dark:text-slate-100 font-medium bg-slate-200 dark:bg-slate-700'>
            {getInitials(userInfo.fullName)}
        </div>

        <div className=''>
            <p className='text-sm font-medium dark:text-slate-100'>{userInfo.fullName}</p>
            <button className='underline text-slate-600 dark:text-slate-300' onClick={onLogout}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Profileinfo
