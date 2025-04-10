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
        <div className='w-96 flex items-center px-4 bg-slate-100 rounded-lg'>
                <input
                        type='text'
                        placeholder='Search Notes'
                        className='w-full text-xs py-[15px] outline-none bg-transparent'
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
                    className='text-slate-400 cursor-pointer hover:text-black' 
                    onClick={handleSearch}
                />
        </div>
    )
}

export default SearchBar