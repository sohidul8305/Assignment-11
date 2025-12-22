// src/routes/Router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Layouts
import RootLayouts from "../Layout/RootLayouts";
import Dashboard from "../page/Home/Dashboard/Dashboard";

// Public Pages
import Home from "../page/Home/Home";
import AboutUs from "../page/Home/Aboutus/AboutUs";
import Contact from "../page/Home/Contact/Contact";
import Login from "../components/Login";
import Register from "../components/Register";
import Allloans from "../page/Home/Allloans/Allloans";
import Availabledetails from "../components/Availabledetails/Availabledetails";
import LoanDetails from "../components/Loandetails/Loandetails";

// Dashboard Pages
import MyLoans from "../page/Home/Dashboard/Myloan/Myloans";
import Profile from "../page/Home/Dashboard/profile/profile";

// Manager Pages
import AddLoan from "../page/Home/Dashboard/Manager/AddLoan/AddLoan";
import ManageLoans from "../page/Home/Dashboard/ManageLoans/ManageLoans";
import PendingLoans from "../page/Home/Dashboard/Manager/PendingLoans/PendingLoans";
import ApprovedLoans from "../page/Home/Dashboard/ApprovedLoans/ApprovedLoans";

// Admin Pages
import ManageUsers from "../page/Home/Dashboard/Admin/ManageUsers";
import AllLoans from "../page/Home/Dashboard/Admin/AllLoans";
import LoanApplications from "../page/Home/Dashboard/Admin/LoanApplications";

// Route Guards
import PrivateRoutes from "./PrivateRoutes";
import BorrowerRoute from "./BorrowerRoute";
import ManagerRoute from "./ManagerRoute";
import AdminRoute from "./AdminRoute";
import LoanApplicationForm from "../components/Applyloan/LoanApplications";
import UpdateLoan from "../page/Home/Dashboard/ManageLoans/UpdateLoan";

export const router = createBrowserRouter([
  // ================= PUBLIC ROUTES =================
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-loans", element: <Allloans /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {path: "loan-applications", element: <LoanApplicationForm></LoanApplicationForm>},
      {
        path: "loan-details/:id",
        element: (
          <PrivateRoutes>
            <LoanDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "available-details/:id",
        element: <Availabledetails />,
      },
    ],
  },

  // ================= DASHBOARD =================
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      // ===== Borrower =====
      {
        index: true,
        element: (
          <BorrowerRoute>
            <MyLoans />
          </BorrowerRoute>
        ),
      },
      {
        path: "my-loans",
        element: (
          <BorrowerRoute>
            <MyLoans />
          </BorrowerRoute>
        ),
      },
// Manager Pages
{
  path: "add-loan",
  element: (
    <ManagerRoute>
      <AddLoan />
    </ManagerRoute>
  ),
},
{
  path: "manage-loans",
  element: (
    <ManagerRoute>
      <ManageLoans />
    </ManagerRoute>
  ),
},
{
  path: "update-loan/:id",   // <-- ঠিক এইভাবে path দিতে হবে
  element: (
    <ManagerRoute>
      <UpdateLoan />
    </ManagerRoute>
  ),
},
{
  path: "pending-loans",
  element: (
    <ManagerRoute>
      <PendingLoans />
    </ManagerRoute>
  ),
},
{
  path: "approved-loans",
  element: (
    <ManagerRoute>
      <ApprovedLoans />
    </ManagerRoute>
  ),
},

      // ===== Admin =====
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-loan",
        element: (
          <AdminRoute>
            <AllLoans />
          </AdminRoute>
        ),
      },
      {
        path: "loan-applications",
        element: (
          <AdminRoute>
            <LoanApplications />
          </AdminRoute>
        ),
      },

      // ===== Common =====
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
