import React, { useState, useEffect } from 'react';
import LoanLogo from '../assets/Loanlogo.png';

// Dummy User Avatar component (Replace with your actual image/component)
const UserAvatar = () => (
  <div className="avatar placeholder">
    <div className="bg-neutral text-neutral-content rounded-full w-10">
      <span className="text-xl">U</span>
    </div>
  </div>
);

// Theme Toggle Icons (as defined previously)
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);


const Navbar = () => {
  // State 1: Theme Management
  const [theme, setTheme] = useState('light'); 
  
  // State 2: Login/Logout Management (শুরুতে লগইন করা নেই)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); 

  // --- Theme Toggle Logic ---
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // --- Login/Logout Logic ---
  const handleAuthClick = () => {
    setIsUserLoggedIn(!isUserLoggedIn);
    // In a real application, this would involve API calls
    if (isUserLoggedIn) {
      alert('You have been logged out!');
    } else {
      alert('You are now logged in!');
    }
  };


  // --- Helper Function to render main navigation links ---
  const renderNavLinks = () => {
    if (isUserLoggedIn) {
      // AFTER LOGIN Links: Home, All-Loans, Dashboard
      return (
        <>
          <li className='hover:bg-base-200 rounded-lg'><a>Home</a></li>
          <li className='hover:bg-base-200 rounded-lg'><a>All-Loans</a></li>
          <li className='hover:bg-base-200 rounded-lg'><a>Dashboard</a></li>
        </>
      );
    } else {
      // BEFORE LOGIN Links: Home, All-Loans, About Us, Contact
      return (
        <>
          <li className='hover:bg-base-200 rounded-lg'><a>Home</a></li>
          <li className='hover:bg-base-200 rounded-lg'><a>All-Loans</a></li>
          <li className='hover:bg-base-200 rounded-lg'><a>About Us</a></li>
          <li className='hover:bg-base-200 rounded-lg'><a>Contact</a></li>
        </>
      );
    }
  };
  
  // --- Helper Function to render end section (auth and theme) ---
  const renderAuthAndTheme = () => {
    if (isUserLoggedIn) {
      // AFTER LOGIN: User Avatar, Logout, Theme Toggle
      return (
        <>
          {/* User Avatar */}
          <UserAvatar /> 
          
          {/* Logout Button */}
          <button 
            className="btn btn-outline btn-error ml-2" 
            onClick={handleAuthClick}
          >
            Logout
          </button>
          
          {/* Theme Toggle Button */}
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
            <div className="swap-off"><SunIcon /></div>
            <div className="swap-on"><MoonIcon /></div>
          </label>
        </>
      );
    } else {
      // BEFORE LOGIN: Login, Register, Theme Toggle
      return (
        <>
          {/* Login Button */}
          <button 
            className="btn btn-Neutral"
            onClick={handleAuthClick}
          >
            Login
          </button>
          
          {/* Register Button */}
          <button className="btn btn-primary">
            Register
          </button>
          
          {/* Theme Toggle Button */}
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
            <div className="swap-off"><SunIcon /></div>
            <div className="swap-on"><MoonIcon /></div>
          </label>
        </>
      );
    }
  };


  // --- Render (JSX) ---
  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      
      {/* 1. Logo and Mobile Dropdown (Navbar Start) */}
      <div className="navbar-start">
        {/* Mobile Dropdown Menu (Hamburger) */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          {/* Mobile menu items change based on state */}
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {/* Mobile links using the same logic */}
            {isUserLoggedIn ? (
              <>
                <li><a>Home</a></li>
                <li><a>All-Loans</a></li>
                <li><a>Dashboard</a></li>
                <li onClick={handleAuthClick}><a>Logout</a></li>
              </>
            ) : (
              <>
                <li><a>Home</a></li>
                <li><a>All-Loans</a></li>
                <li><a>About Us</a></li>
                <li><a>Contact</a></li>
                <li onClick={handleAuthClick}><a>Login</a></li>
                <li><a>Register</a></li>
              </>
            )}
          </ul>
        </div>
        
        {/* Logo Display */}
        <div className="flex-shrink-0">
          <img src={LoanLogo} alt="Loan Logo" className="h-20 w-auto" />
        </div>
      </div>
      
      {/* 2. Primary Navigation Links (Navbar Center) - Desktop Only */}
      <div className="navbar-center hidden lg:flex">
        <ul className='menu menu-horizontal px-1 font-medium text-lg'>
          {renderNavLinks()}
        </ul>
      </div>
      
      {/* 3. Theme Toggle and Buttons (Navbar End) */}
      <div className="navbar-end gap-2">
        {renderAuthAndTheme()}
      </div>
      
    </div>
  );
};

export default Navbar;