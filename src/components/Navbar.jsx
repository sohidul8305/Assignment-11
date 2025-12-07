// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import LoanLogo from "../assets/Loanlogo.png";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const isUserLoggedIn = !!user;

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Logout Error:", error);
        navigate("/");
      });
  };

  // 🚀 এই অংশটি সংশোধন করা হয়েছে!
  const UserAvatar = () => (
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content rounded-full w-10 ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center">
        {user?.photoURL ? (
          // ✅ ফটো থাকলে শুধু <img>
          <img src={user.photoURL} alt="User Avatar" />
        ) : (
          // ✅ ফটো না থাকলে টেক্সট দেখানোর জন্য <span>
          <span className="text-xl">
            {user?.displayName ? user.displayName.charAt(0) : "U"}
          </span>
        )}
      </div>
    </div>
  );
    // ⬆️⬆️⬆️ এখানে আপনার পূর্বের ভুল ঠিক করা হয়েছে ⬆️⬆️⬆️

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
      <li key={link.name}>
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            isActive ? "text-primary font-bold border-b-2 border-primary" : "hover:text-primary transition-colors"
          }
        >
          {link.name}
        </NavLink>
      </li>
    ));
  };

  const ThemeToggleButton = () => (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
      {/* Sun Icon */}
      <svg className="swap-off fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM18.36,6.34a1,1,0,0,0-1.41-1.41l-.71.71a1,1,0,0,0,1.41,1.41ZM12,20a1,1,0,0,0,1-1V17a1,1,0,0,0-2,0v2A1,1,0,0,0,12,20ZM17,18.36a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l.71-.71A1,1,0,0,0,17,16.95ZM18,11H19a1,1,0,0,0,0-2H18a1,1,0,0,0,0,2Zm-5-3.56a4.5,4.5,0,1,0,0,9,4.5,4.5,0,0,0,0-9Z"/>
      </svg>
      {/* Moon Icon */}
      <svg className="swap-on fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8,8,0,0,1-11.41-9,1,1,0,0,0-.43-.73,1,1,0,0,0-.76-.05A10,10,0,0,0,17.9,20.67,10,10,0,0,0,21.64,13Z"/>
      </svg>
    </label>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {renderNavLinks()}
            {isUserLoggedIn ? (
              <li><button className="btn btn-sm btn-outline btn-error mt-2" onClick={handleLogOut}>Logout</button></li>
            ) : (
              <>
                <li className="mt-2"><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
            <li className="flex justify-center mt-3 p-0"><ThemeToggleButton /></li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={LoanLogo} alt="Logo" className="h-14 w-auto" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base font-medium flex items-center gap-2">
          {renderNavLinks()}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-2">
        {isUserLoggedIn ? (
          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <UserAvatar />
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogOut}>Logout</button></li>
              </ul>
            </div>
            <ThemeToggleButton />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login"><button className="btn btn-neutral btn-sm md:btn-md">Login</button></Link>
            <Link to="/register"><button className="btn btn-primary btn-sm md:btn-md">Register</button></Link>
            <ThemeToggleButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;