import React from 'react';
import { FaUserAlt, FaHome, FaClipboardList, FaMoneyBillWave, FaCog, FaCreditCard, FaUserTie } from 'react-icons/fa';
import { NavLink, Outlet, Link } from 'react-router-dom';

// ⚠️ দ্রষ্টব্য: এখানে আপনাকে আপনার Auth Context থেকে বর্তমান ইউজারের রোল (role) ফেচ করে নিতে হবে।
// আপাতত আমরা ধরে নিলাম একটি ফাংশন আছে যা রোল দেয়।
// const { user, role, loading } = useAuth(); 
const currentUserRole = 'Admin'; // <--- রিয়েল অ্যাপ্লিকেশনে এটি ডায়নামিক হবে

const Dashboard = () => {

    // --- ১. রোল অনুযায়ী ড্যাশবোর্ড লিংক তৈরি ---
    let dashboardLinks;

    // --- Admin Links (Manage Users, All Loans, All Applications) ---
    if (currentUserRole === 'Admin') {
        dashboardLinks = (
            <>
                <li>
                    <NavLink to="/dashboard/manage-users" className={({ isActive }) => isActive ? 'bg-primary text-white flex items-center p-3 rounded-lg' : 'hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg'}>
                        <FaUserAlt className="w-5 h-5 mr-3" />
                        <span className="font-medium">Manage Users</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/all-loan" className={({ isActive }) => isActive ? 'bg-primary text-white flex items-center p-3 rounded-lg' : 'hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg'}>
                        <FaMoneyBillWave className="w-5 h-5 mr-3" />
                        <span className="font-medium">All Loans (Admin View)</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/loan-applications" className={({ isActive }) => isActive ? 'bg-primary text-white flex items-center p-3 rounded-lg' : 'hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg'}>
                        <FaClipboardList className="w-5 h-5 mr-3" />
                        <span className="font-medium">Loan Applications</span>
                    </NavLink>
                </li>
            </>
        );
    } 
    
    // --- Manager Links (Example Routes for Manager) ---
    else if (currentUserRole === 'Manager') {
        dashboardLinks = (
            <>
                <li>
                    <NavLink to="/dashboard/pending-applications" className={({ isActive }) => isActive ? 'bg-primary text-white flex items-center p-3 rounded-lg' : 'hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg'}>
                        <FaClipboardList className="w-5 h-5 mr-3" />
                        <span className="font-medium">Pending Loans (Manager)</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/all-loans-view" className={({ isActive }) => isActive ? 'bg-primary text-white flex items-center p-3 rounded-lg' : 'hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg'}>
                        <FaMoneyBillWave className="w-5 h-5 mr-3" />
                        <span className="font-medium">View All Loans</span>
                    </NavLink>
                </li>
            </>
        );
    } 
    
    // --- Borrower Links (My Loans, Apply for Loan - from Req. 6) ---
    else if (currentUserRole === 'Borrower') {
        dashboardLinks = (
            <>
                <li>
                    <NavLink to="/dashboard/my-loans" className={({ isActive }) => isActive ? 'bg-primary text-white flex items-center p-3 rounded-lg' : 'hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg'}>
                        <FaCreditCard className="w-5 h-5 mr-3" />
                        <span className="font-medium">My Loans</span>
                    </NavLink>
                </li>
                <li>
                    {/* Loan Application Form page is needed as a direct link too */}
                    <NavLink to="/loan-application-form" className={({ isActive }) => isActive ? 'bg-primary text-white flex items-center p-3 rounded-lg' : 'hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg'}>
                        <FaMoneyBillWave className="w-5 h-5 mr-3" />
                        <span className="font-medium">Apply for New Loan</span>
                    </NavLink>
                </li>
            </>
        );
    }
    
    // --- ২. মেইন কম্পোনেন্ট রিটার্ন ---
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            
            {/* --- Main Content Area --- */}
            <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
                
                {/* Navbar (Top Bar) */}
                <nav className="navbar w-full bg-white shadow-md sticky top-0 z-10">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-4 text-2xl font-semibold text-gray-800">
                        Loan Mate <span className="text-primary">Dashboard</span>
                    </div>
                    <div className="flex-none">
                        <div className="flex items-center space-x-2 mr-4">
                            {/* Display Current Role */}
                            <FaUserTie className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-600">{currentUserRole}</span>
                        </div>
                        <button className="btn btn-ghost btn-circle">
                            <FaUserAlt className="w-5 h-5" />
                        </button>
                    </div>
                </nav>
                
                {/* Page Content */}
                <div className="p-6 flex-grow">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, {currentUserRole}! 👋</h1>
                    <p className="text-lg text-gray-600 mb-8">Manage your loan operations efficiently.</p>
                    
                    {/* Placeholder for Routed Content */}
                    <div className="bg-white p-6 rounded-xl shadow-lg min-h-[70vh]">
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
                    
                    {/* Main Links (Conditionally Rendered) */}
                    {dashboardLinks}
                    
                    {/* Separator */}
                    <div className="divider my-2"></div>
                    
                    {/* Common Links */}
                    <li>
                        <Link to="/" className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200">
                            <FaHome className="w-5 h-5 mr-3" />
                            <span className="font-medium">Go to Homepage</span>
                        </Link>
                    </li>
                    
                    <li>
                        <button className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200">
                            <FaCog className="w-5 h-5 mr-3" />
                            <span className="font-medium">Settings & Profile</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;