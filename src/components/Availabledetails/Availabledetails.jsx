import React from "react";
import { useLocation } from "react-router-dom";

const Availabledetails = () => {
  const location = useLocation();
  const loan = location.state?.loan;

  if (!loan) {
    return <div className="text-center mt-10 text-red-500">Loan details not found!</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <img
        src={loan.image || "https://via.placeholder.com/400x250"} // fallback image
        alt={loan.title || "Loan Image"}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{loan.title || "No Title Available"}</h1>
      <p className="text-gray-700 mb-2">
        {loan.shortDesc || "No description available."}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Max Loan Limit:</span> ৳{loan.maxLimit || "N/A"}
      </p>
    </div>
  );
};

export default Availabledetails;
