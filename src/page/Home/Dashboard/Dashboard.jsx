import React from 'react';
import { FaUserAlt, FaHome, FaClipboardList, FaMoneyBillWave, FaCog } from 'react-icons/fa';
import { NavLink, Outlet, Link } from 'react-router-dom'; // Use 'react-router-dom' for NavLink/Link in modern React Router

const Dashboard = () => {
    // Define the sidebar links here for cleaner JSX
    const dashboardLinks = (
        <>
            {/* NavLink for 'Manage User' */}
                {/* General Links */}
                    <li>
                        <Link to="/" className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200">
                            <FaHome className="w-5 h-5 mr-3" />
                            <span className="font-medium">Go to Homepage</span>
                        </Link>
                    </li>
            <li>
                <NavLink 
                    to="/dashboard/MangeUsers"
                    className={({ isActive }) => 
                        `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                            isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'
                        }`
                    }
                >

                    <FaUserAlt className="w-5 h-5 mr-3" />
                    <span className="font-medium">Manage Users</span>
                </NavLink>
            </li>
            
            {/* NavLink for 'All Loan' */}
            <li>
                <NavLink 
                    to="/dashboard/Allloan" 
                    className={({ isActive }) => 
                        `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                            isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'
                        }`
                    }
                >
                    <FaMoneyBillWave className="w-5 h-5 mr-3" />
                    <span className="font-medium">All Loans</span>
                </NavLink>
            </li>
            
            {/* NavLink for 'Loan Application' */}
            <li>
                <NavLink 
                    to="/dashboard/loanapplication" 
                    className={({ isActive }) => 
                        `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                            isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'
                        }`
                    }
                >
                    <FaClipboardList className="w-5 h-5 mr-3" />
                    <span className="font-medium">Loan Applications</span>
                </NavLink>
            </li>
        </>
    );

    return (
        // The main drawer container from your original code
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            
            {/* --- Main Content Area --- */}
            <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
                {/* Navbar (Top Bar) */}
                <nav className="navbar w-full bg-white shadow-md sticky top-0 z-10">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Hamburger Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-4 text-2xl font-semibold text-gray-800">
                        Loan Mate <span className="text-primary">Dashboard</span>
                    </div>
                    <div className="flex-none">
                        <button className="btn btn-ghost btn-circle">
                            <FaUserAlt className="w-5 h-5" />
                        </button>
                    </div>
                </nav>
                
                {/* Page Content */}
                <div className="p-6 flex-grow">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back! 👋</h1>
                    <p className="text-lg text-gray-600 mb-8">Manage your loan operations efficiently.</p>
                    
                    {/* Placeholder for Routed Content */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <Outlet />
                    </div>
                </div>
            </div>
            
            {/* --- Sidebar Area (Drawer) --- */}
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content shadow-xl">
                    {/* Sidebar Header/Logo */}
                    <li className="py-4 px-3 text-2xl font-extrabold text-primary border-b border-gray-200 mb-4">
                        LoanMate
                    </li>
                    
                    {/* Main Links */}
                    {dashboardLinks}
                    
                    {/* Separator */}
                    <div className="divider my-2"></div>
                    

                    
                    <li>
                        <button className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200">
                            <FaCog className="w-5 h-5 mr-3" />
                            <span className="font-medium">Settings</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;