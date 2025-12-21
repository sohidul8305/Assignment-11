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

  // ================= ROLE FIX =================
  const role =
    user?.email === "manager@loanmate.com" ? "manager" : "borrower";

  // ================= AUTO REDIRECT (NO LOOP) =================
  useEffect(() => {
    if (loading || !user) return;

    if (location.pathname === "/dashboard") {
      if (role === "manager") {
        navigate("/dashboard/add-loan", { replace: true });
      } else {
        navigate("/dashboard/my-loans", { replace: true });
      }
    }
  }, [role, loading, user, navigate, location.pathname]);

  if (loading) {
    return <div className="p-10 text-center">Loading Dashboard...</div>;
  }

  // ================= Borrower Links =================
  const borrowerLinks = (
    <>
      <li>
        <NavLink to="/dashboard/my-loans">
          <FaCreditCard /> My Loans
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile">
          <FaUserAlt /> My Profile
        </NavLink>
      </li>
    </>
  );

  // ================= Manager Links =================
  const managerLinks = (
    <>
      <li>
        <NavLink to="/dashboard/add-loan">
          <FaPlusCircle /> Add Loan
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-loans">
          <FaTasks /> Manage Loans
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/pending-loans">
          <FaTasks /> Pending Applications
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/approved-loans">
          <FaCheckCircle /> Approved Applications
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile">
          <FaUserAlt /> My Profile
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= Main Content ================= */}
      <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
        {/* Top Navbar */}
        <nav className="navbar bg-white shadow-md">
          <div className="flex-none lg:hidden">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              ☰
            </label>
          </div>

          <div className="flex-1 px-4 text-xl font-bold">
            LoanMate Dashboard
          </div>

          <div className="flex items-center gap-2">
            <FaUserTie />
            <span>{role === "manager" ? "Manager" : "Borrower"}</span>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-6 flex-grow">
          <Outlet />
        </div>
      </div>

      {/* ================= Sidebar ================= */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <ul className="menu p-4 w-72 min-h-full bg-base-200">
          <li className="text-xl font-bold mb-4">LoanMate</li>

          <li>
            <Link to="/">
              <FaHome /> Home
            </Link>
          </li>

          <div className="divider"></div>

          {role === "borrower" && borrowerLinks}
          {role === "manager" && managerLinks}

          <div className="divider"></div>

          <li>
            <button onClick={logout} className="text-red-600">
              <FaCog /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
