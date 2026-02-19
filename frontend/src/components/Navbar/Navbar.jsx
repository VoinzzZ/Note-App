import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import Profileinfo from '../Cards/ProfileInfo';
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

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
    <nav className='sticky top-0 z-20 bg-white/90 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 py-3 drop-shadow-sm'>
        <h2 className='text-3xl font-semibold text-gray-800 dark:text-slate-100 tracking-tight'>Notes.</h2>
        
        <div className="flex items-center gap-3">
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

        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
        >
          {isDark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
        </button>

        <Profileinfo userInfo={userInfo} onLogout={onLogout}/>
        </div>
    </nav>
  )
}
export default Navbar
