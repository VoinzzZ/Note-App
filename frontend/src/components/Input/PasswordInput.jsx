import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const PasswordInput = ({ value, onChange, placeholder}) => {

    const [isShowPassword, setIsShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

  return (
    <div className='flex items-center bg-transparent border rounded-lg px-5 focus-within:ring-2 focus-within:ring-primary'>
        <input 
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className='w-full text-sm text-gray-800 bg-transparent py-3 mr-3 outline-none'
        />

        {isShowPassword ? (<FaRegEye
        size={22}
        className='text-primary cursor-pointer'
        onClick={() => toggleShowPassword()}
        /> ):(<FaRegEyeSlash 
        size={22}
        className='cursor-pointer text-slate-400'
        onClick={() => toggleShowPassword()}
        />)}

    </div>
  )
}

export default PasswordInput