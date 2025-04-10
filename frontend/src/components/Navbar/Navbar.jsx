import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import Profileinfo from '../Cards/ProfileInfo';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on the dashboard page
  const isDashboard = location.pathname === '/dashboard';

  const onLogout = () => {
    localStorage.clear();
    navigate("/login")
  }

  const handleSearch = () => {
    if(searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <nav className='bg-white border-b flex items-center justify-between px-6 py-2 drop-shadow-sm'>
        <h2 className='text-3xl font-medium text-gray-800'>Notes.</h2>
        
        {isDashboard && (
          <SearchBar 
            value={searchQuery}
            onChange={({target}) => {
                setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        )}

        <Profileinfo userInfo={userInfo} onLogout={onLogout}/>
    </nav>
  )
}
export default Navbar