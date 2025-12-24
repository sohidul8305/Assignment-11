import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-[10rem] font-bold text-gray-300">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
        Page Not Found
      </p>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Back to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
