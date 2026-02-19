import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && value) {
            handleSearch();
        }
    };

    return (
        <div className='w-full md:w-96 flex items-center px-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700'>
                <input
                        type='text'
                        placeholder='Search Notes'
                        className='w-full text-xs py-[15px] outline-none bg-transparent text-slate-900 dark:text-slate-100'
                        value={value}
                        onChange={onChange}
                        onKeyDown={handleKeyPress}
                />

               {value && (
                <IoMdClose 
                    className='text-xl text-xl-500 cursor-pointer hover:text-black mr-3' 
                    onClick={onClearSearch}
                />
               )}
                
                <FaMagnifyingGlass 
                    className='text-slate-400 dark:text-slate-200 cursor-pointer hover:text-black dark:hover:text-white' 
                    onClick={handleSearch}
                />
        </div>
    )
}

export default SearchBar
