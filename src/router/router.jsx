// router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import RootLayouts from "../Layout/RootLayouts";
import Home from "../page/Home/Home";
import AboutUs from "../page/Home/Aboutus/AboutUs";
import Contact from "../page/Home/Contact/Contact";
import Login from "../components/Login";
import Register from "../components/Register";
import Applyloan from "../components/Applyloan/Applyloan";
import Loandetails from "../components/Loandetails/Loandetails";
import PrivateRoutes from "./PrivateRoutes";
import Allloans from "../page/Home/Allloans/Allloans";
import Dashboard from "../page/Home/Dashboard/Dashboard";
import ManageUsers from "../page/Home/Dashboard/User/ManageUsers";
import Allloan from "../page/Home/Dashboard/AllLoan/Allloan";
import Availabledetails from "../components/Availabledetails/Availabledetails";


export const router = createBrowserRouter([
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
      { path: "loan-application-form", element: <Applyloan /> },
      { path: "loan-details/:id", element:
         <PrivateRoutes><Loandetails /></PrivateRoutes>
     },
      { path: "available-details/:id", element: <Availabledetails /> },
    ],
  },
   {
    path: "dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      {
       path: 'manage-users',
       Component: ManageUsers,
      },
      {
       path: 'all-loan',
       Component: Allloan,
      },
      {
       path: 'loan-application-form',
       Component: Applyloan,
      }
    ]
   }
]);
