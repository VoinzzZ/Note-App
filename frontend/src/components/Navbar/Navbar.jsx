import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import Profileinfo from '../Cards/ProfileInfo';

const Navbar = ({ userInfo }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login")
  }

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <nav className='bg-white border-b flex items-center justify-between px-6 py-2 drop-shadow-sm'>
        <h2 className='text-3xl font-medium text-gray-800'>Notes.</h2>
        <SearchBar 
            value={searchQuery}
            onChange={({target}) => {
                setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
        />

        <Profileinfo userInfo={userInfo} onLogout={onLogout}/>
    </nav>
  )
}
export default Navbar