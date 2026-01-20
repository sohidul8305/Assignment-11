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

  const UserAvatar = () => (
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content rounded-full w-10 ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User Avatar" />
        ) : (
          <span className="text-xl">
            {user?.displayName ? user.displayName.charAt(0) : "U"}
          </span>
        )}
      </div>
    </div>
  );

  // 🔥 Updated: User লগইন করলে ৫টি আইটেম দেখাবে
  const renderNavLinks = () => {
    const links = isUserLoggedIn
      ? [
          { name: "Home", path: "/" },
          { name: "All Loans", path: "/all-loans" },
          { name: "My Applications", path: "/applications" }, // ✅ নতুন ১
          { name: "Loan Calculator", path: "/calculator" }, // ✅ নতুন ২
          { name: "Dashboard", path: "/dashboard" },
        ]
      : [
          { name: "Home", path: "/" },
          { name: "All Loans", path: "/all-loans" },
          { name: "About Us", path: "/about-us" },
          { name: "Contact", path: "/contact" },
        ];

    return links.map((link) => (
      <li key={link.name}>
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold border-b-2 border-primary"
              : "hover:text-primary transition-colors"
          }
        >
          {link.name}
        </NavLink>
      </li>
    ));
  };

  const ThemeToggleButton = () => (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      {/* Sun Icon */}
      <svg
        className="swap-off fill-current h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM18.36,6.34a1,1,0,0,0-1.41-1.41l-.71.71a1,1,0,0,0,1.41,1.41ZM12,20a1,1,0,0,0,1-1V17a1,1,0,0,0-2,0v2A1,1,0,0,0,12,20ZM17,18.36a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l.71-.71A1,1,0,0,0,17,16.95ZM18,11H19a1,1,0,0,0,0-2H18a1,1,0,0,0,0,2Zm-5-3.56a4.5,4.5,0,1,0,0,9,4.5,4.5,0,1,0,0-9Z" />
      </svg>
      {/* Moon Icon */}
      <svg
        className="swap-on fill-current h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8,8,0,0,1-11.41-9,1,1,0,0,0-.43-.73,1,1,0,0,0-.76-.05A10,10,0,0,0,17.9,20.67,10,10,0,0,0,21.64,13Z" />
      </svg>
    </label>
  );

  return (
    <div className="w-full bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar">
          {/* Mobile Menu */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {renderNavLinks()}
                {isUserLoggedIn ? (
                  <li>
                    <button
                      className="btn btn-sm btn-outline btn-error mt-2"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li className="mt-2">
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </>
                )}
                <li className="flex justify-center mt-3 p-0">
                  <ThemeToggleButton />
                </li>
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={LoanLogo} alt="Logo" className="h-14 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base font-medium flex items-center gap-4">
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
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {/* 🔥 Updated: User ড্রপডাউনে বেশি অপশন */}
                    <li className="menu-title">
                      <span>My Account</span>
                    </li>
                    <li>
                      <Link to="/dashboard">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/applications">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        My Applications
                      </Link>
                    </li>
                    <li>
                      <Link to="/calculator">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Loan Calculator
                      </Link>
                    </li>
                    <li>
                      <Link to="/documents">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Documents
                      </Link>
                    </li>
                    <div className="divider my-1"></div>
                    <li>
                      <button onClick={handleLogOut} className="text-error">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
                <ThemeToggleButton />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <button className="btn btn-neutral btn-sm md:btn-md">Login</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-primary btn-sm md:btn-md">Register</button>
                </Link>
                <ThemeToggleButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;