import React, { useEffect } from "react";
import {
  FaUserAlt,
  FaHome,
  FaCreditCard,
  FaCog,
  FaUserTie,
  FaPlusCircle,
  FaTasks,
  FaCheckCircle,
} from "react-icons/fa";
import { NavLink, Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ================= ROLE DETECTION =================
  const role = user?.email === "manager@loanmate.com"
    ? "manager"
    : user?.email === "admin@loanmate.com"
    ? "admin"
    : "borrower";

  // ================= AUTO REDIRECT =================
  useEffect(() => {
    if (loading || !user) return;

    if (location.pathname === "/dashboard") {
      if (role === "admin") navigate("/dashboard/manage-users", { replace: true });
      else if (role === "manager") navigate("/dashboard/add-loan", { replace: true });
      else navigate("/dashboard/my-loans", { replace: true });
    }
  }, [role, loading, user, navigate, location.pathname]);

  if (loading) {
    return <div className="p-10 text-center">Loading Dashboard...</div>;
  }

  // ================= Borrower Links =================
  const borrowerLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard/my-loans"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-white flex items-center p-3 rounded-lg"
              : "hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg"
          }
        >
          <FaCreditCard className="w-5 h-5 mr-3" /> My Loans
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-white flex items-center p-3 rounded-lg"
              : "hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg"
          }
        >
          <FaUserAlt className="w-5 h-5 mr-3" /> My Profile
        </NavLink>
      </li>
    </>
  );

  // ================= Manager Links =================
  const managerLinks = (
    <>
      <li>
        <NavLink to="/dashboard/add-loan" className={({ isActive }) =>
            isActive
              ? "bg-primary text-white flex items-center p-3 rounded-lg"
              : "hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg"
          }>
          <FaPlusCircle className="w-5 h-5 mr-3" /> Add Loan
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-loans" className={({ isActive }) =>
            isActive
              ? "bg-primary text-white flex items-center p-3 rounded-lg"
              : "hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg"
          }>
          <FaTasks className="w-5 h-5 mr-3" /> Manage Loans
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/pending-loans" className={({ isActive }) =>
            isActive
              ? "bg-primary text-white flex items-center p-3 rounded-lg"
              : "hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg"
          }>
          <FaTasks className="w-5 h-5 mr-3" /> Pending Applications
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/approved-loans" className={({ isActive }) =>
            isActive
              ? "bg-primary text-white flex items-center p-3 rounded-lg"
              : "hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg"
          }>
          <FaCheckCircle className="w-5 h-5 mr-3" /> Approved Applications
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile" className={({ isActive }) =>
            isActive
              ? "bg-primary text-white flex items-center p-3 rounded-lg"
              : "hover:bg-gray-100 text-gray-700 flex items-center p-3 rounded-lg"
          }>
          <FaUserAlt className="w-5 h-5 mr-3" /> My Profile
        </NavLink>
      </li>
    </>
  );

  // ================= Admin Links =================
  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard/manage-users">
          <FaUserAlt className="w-5 h-5 mr-3" /> Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-loan">
          <FaCreditCard className="w-5 h-5 mr-3" /> All Loans
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/loan-applications">
          <FaTasks className="w-5 h-5 mr-3" /> Loan Applications
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="navbar bg-white shadow-md sticky top-0 z-10">
          <div className="flex-none lg:hidden">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              ☰
            </label>
          </div>
          <div className="flex-1 px-4 text-xl font-bold">LoanMate Dashboard</div>
          <div className="flex items-center gap-2">
            <FaUserTie /> <span>{role === "manager" ? "Manager" : role === "admin" ? "Admin" : "Borrower"}</span>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-6 flex-grow">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-200">
          <li className="text-xl font-bold mb-4">LoanMate</li>

          {/* Common */}
          <li>
            <Link to="/">
              <FaHome className="mr-3" /> Home
            </Link>
          </li>

          <div className="divider"></div>

          {/* Role Based Links */}
          {role === "borrower" && borrowerLinks}
          {role === "manager" && managerLinks}
          {role === "admin" && adminLinks}

          <div className="divider"></div>

          <li>
            <button onClick={logout} className="text-red-600 flex items-center">
              <FaCog className="mr-2" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
