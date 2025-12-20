import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoanDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const loan = location.state?.loan;

  if (!loan) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 mb-4">Loan details not found!</p>
        <button
          onClick={() => navigate("/available")}
          className="btn btn-primary"
        >
          Back to Available Loans
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto max-w-xl bg-white shadow-lg rounded-xl p-6">
        <img
          src={loan.image || "https://via.placeholder.com/400x250"}
          alt={loan.title || "Loan Image"}
          className="w-full h-64 object-cover rounded-md mb-5"
        />

        <h1 className="text-2xl font-bold mb-3">
          {loan.title || "Loan Title"}
        </h1>

        <p className="text-gray-700 mb-4">
          {loan.shortDesc || "No description available."}
        </p>

        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Max Loan Limit:</span>{" "}
          <span className="text-green-600 font-bold">
            ৳{loan.maxLimit || "N/A"}
          </span>
        </p>

        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline mt-6 w-full"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default LoanDetails;
