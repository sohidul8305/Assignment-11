// src/routes/Router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Layout
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
import LoanApplicationForm from "../components/Applyloan/LoanApplications";
import Myapplication from "../page/Home/Myapplication/Myapplication";
import Loancalculator from "../page/Home/Loancalculator/Loancalculator";

// Dashboard - Common
import MyLoans from "../page/Home/Dashboard/Myloan/Myloans";
import Profile from "../page/Home/Dashboard/profile/profile";
import PaymentSuccess from "../page/Home/Dashboard/Paymentsuccess/PaymentSuccess";

// Manager
import AddLoan from "../page/Home/Dashboard/Manager/AddLoan/AddLoan";
import ManageLoans from "../page/Home/Dashboard/ManageLoans/ManageLoans";
import PendingLoans from "../page/Home/Dashboard/Manager/PendingLoans/PendingLoans";
import ApprovedLoans from "../page/Home/Dashboard/ApprovedLoans/ApprovedLoans";
import UpdateLoan from "../page/Home/Dashboard/ManageLoans/UpdateLoan";

// Admin
import ManageUsers from "../page/Home/Dashboard/Admin/ManageUsers";
import AllLoans from "../page/Home/Dashboard/Admin/AllLoans";
import LoanApplications from "../page/Home/Dashboard/Admin/LoanApplications";
import Analytics from "../page/Home/Dashboard/Admin/Analytics/analytics";

// Route Guards
import PrivateRoutes from "./PrivateRoutes";
import BorrowerRoute from "./BorrowerRoute";
import ManagerRoute from "./ManagerRoute";
import AdminRoute from "./AdminRoute";

// 404
import NotFound from "../page/NotFound";
import Reports from "../page/Home/Dashboard/Admin/Reports/Reports";

export const router = createBrowserRouter([
  /* ================= PUBLIC ROUTES ================= */
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-loans", element: <Allloans /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
      { path: "applications", element: <Myapplication /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "loan-applications", element: <LoanApplicationForm /> },
      { path: "calculator", element: <Loancalculator /> },
      {
        path: "loan-details/:id",
        element: (
          <PrivateRoutes>
            <LoanDetails />
          </PrivateRoutes>
        ),
      },
      { path: "available-details/:id", element: <Availabledetails /> },

      // Public 404
      { path: "*", element: <NotFound /> },
    ],
  },

  /* ================= DASHBOARD ROUTES ================= */
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      // Common
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "profile", element: <Profile /> },

      // Borrower
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

      // Manager
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
        path: "update-loan/:id",
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
      {
        path: "manager-analytics",
        element: (
          <ManagerRoute>
            <Analytics />
          </ManagerRoute>
        ),
      },
{
  path: "applications",
  element: (
    <BorrowerRoute>
      <Myapplication />
    </BorrowerRoute>
  ),
},
      // Admin
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-loans",
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
      {
        path: "/dashboard/analytics",
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reports",
        element: (
          <AdminRoute>
            <Reports />
          </AdminRoute>
        ),
      },

      // Dashboard 404
      { path: "*", element: <NotFound /> },
    ],
  },
]);
