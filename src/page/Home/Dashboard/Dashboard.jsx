import React from 'react';
import { FaUserAlt, FaHome, FaMoneyBillWave, FaCreditCard, FaCog, FaUserTie } from 'react-icons/fa';
import { NavLink, Outlet, Link } from 'react-router-dom';

// ডিফল্টভাবে Borrower দেখানোর জন্য
const currentUserRole = 'Borrower';

const Dashboard = () => {

    // Borrower Links (My Loans, Apply for Loan, My Profile)
    const dashboardLinks = (
        <>


                    {/* Common Links */}
                    <li>
                        <Link to="/" className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                            <FaHome className="w-5 h-5 mr-3" />
                            <span className="font-medium">Go to Homepage</span>
                        </Link>
                    </li>
            <li>
                <NavLink to="/dashboard/my-loans" className={({ isActive }) => isActive 
                    ? 'bg-primary text-white flex items-center p-3 rounded-lg' 
                    : 'hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg'}>
                    <FaCreditCard className="w-5 h-5 mr-3" />
                    <span className="font-medium">My Loans</span>
                </NavLink>
            </li>
            <li>

            </li>
            <li>
                <NavLink to="/dashboard/profile" className={({ isActive }) => isActive
                    ? 'bg-primary text-white flex items-center p-3 rounded-lg'
                    : 'hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg'}>
                    <FaUserAlt className="w-5 h-5 mr-3" />
                    <span className="font-medium">My Profile</span>
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* Main Content */}
            <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
                {/* Top Navbar */}
                <nav className="navbar w-full bg-white shadow-md sticky top-0 z-10">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 px-4 text-2xl font-semibold text-gray-800">
                        Loan Mate <span className="text-primary">Dashboard</span>
                    </div>
                    <div className="flex-none flex items-center space-x-4">
                        <FaUserTie className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">{currentUserRole}</span>
                        <button className="btn btn-ghost btn-circle">
                            <FaUserAlt className="w-5 h-5" />
                        </button>
                    </div>
                </nav>

                {/* Page Content */}
                <div className="p-6 flex-grow">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, {currentUserRole}! 👋</h1>
                    <p className="text-lg text-gray-600 mb-8">Manage your loans efficiently.</p>

                    {/* Routed Content */}
                    <div className="bg-white p-6 rounded-xl shadow-lg min-h-[70vh]">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content shadow-xl">

                    {/* Sidebar Header */}
                    <li className="py-4 px-3 text-2xl font-extrabold text-primary border-b border-gray-200 mb-4">
                        LoanMate
                    </li>

                    {/* Borrower Links */}
                    {dashboardLinks}

                    <div className="divider my-2"></div>


                    <li>
                        <Link to="/dashboard/profile" className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                            <FaCog className="w-5 h-5 mr-3" />
                            <span className="font-medium">Settings & Profile</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
