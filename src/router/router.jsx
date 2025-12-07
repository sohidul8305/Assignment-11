// router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../Layout/RootLayouts";
import Home from "../page/Home/Home";
import Allloans from "../page/Home/Allloans/Allloans";
import AboutUs from "../page/Home/Aboutus/AboutUs";
import Contact from "../page/Home/Contact/Contact";
import Login from "../components/Login";
import Register from "../components/Register";
import Applyloan from "../components/Applyloan/Applyloan";


// Dummy Dashboard Component
const Dashboard = () => (
  <div className="p-10 text-center text-2xl font-bold min-h-[60vh] flex items-center justify-center bg-base-100">
    Welcome to your Dashboard!
  </div>
);

// Wrap all routes with AuthProvider
export const router = createBrowserRouter([
  {
    path: "/",
    element: (

        <RootLayouts />

    ),
    children: [
      { index: true, element: <Home /> },
      { path: "all-loans", element: <Allloans /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "loan-application-form", element: <Applyloan /> },
    ],
  },
]);
