import React, { useState, useEffect } from "react";
import LoanLogo from "../assets/Loanlogo.png";
import { NavLink, Link } from "react-router";

// Dummy User Avatar
const UserAvatar = () => (
  <div className="avatar placeholder">
    <div className="bg-neutral text-neutral-content rounded-full w-10">
      <span className="text-xl">U</span>
    </div>
  </div>
);

// Theme Icons
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
  const [theme, setTheme] = useState("light");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Load theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleAuthClick = () => {
    setIsUserLoggedIn(!isUserLoggedIn);
    alert(isUserLoggedIn ? "Logged out!" : "Logged in!");
  };

  // Desktop links
  const renderNavLinks = () => {
    const links = isUserLoggedIn
      ? [
          { name: "Home", path: "/" },
          { name: "All-Loans", path: "/all-loans" },
          { name: "Dashboard", path: "/dashboard" },
        ]
      : [
          { name: "Home", path: "/" },
          { name: "All-Loans", path: "/all-loans" },
          { name: "About Us", path: "/about-us" },
          { name: "Contact", path: "/contact" },
        ];

    return links.map((link) => (
      <li key={link.name} className="hover:bg-base-200 rounded-lg">
        <NavLink
          to={link.path}
          className={({ isActive }) => (isActive ? "text-red-500 font-bold" : "")}
        >
          {link.name}
        </NavLink>
      </li>
    ));
  };

  // Auth & theme
  const renderAuthAndTheme = () => {
    if (isUserLoggedIn) {
      return (
        <div className="flex items-center gap-2">
          <UserAvatar />
          <button className="btn btn-outline btn-error" onClick={handleAuthClick}>
            Logout
          </button>
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
            <div className="swap-off"><SunIcon /></div>
            <div className="swap-on"><MoonIcon /></div>
          </label>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <Link to="/login">
            <button className="btn btn-neutral" onClick={handleAuthClick}>Login</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-primary">Register</button>
          </Link>
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
            <div className="swap-off"><SunIcon /></div>
            <div className="swap-on"><MoonIcon /></div>
          </label>
        </div>
      );
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {isUserLoggedIn ? (
              <>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/all-loans">All-Loans</NavLink></li>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><button onClick={handleAuthClick}>Logout</button></li>
              </>
            ) : (
              <>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/all-loans">All-Loans</NavLink></li>
                <li><NavLink to="/about-us">About Us</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><Link to="/login"><button onClick={handleAuthClick}>Login</button></Link></li>
                <li><Link to="/register"><button>Register</button></Link></li>
              </>
            )}
          </ul>
        </div>
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={LoanLogo} alt="Loan Logo" className="h-20 w-auto" />
        </div>
      </div>

      {/* Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium text-lg">
          {renderNavLinks()}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-2">{renderAuthAndTheme()}</div>
    </div>
  );
};

export default Navbar;
