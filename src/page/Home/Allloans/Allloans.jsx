import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const API = "http://localhost:4000";

const AllLoans = () => {
  const { user } = useAuth();

  // ================= Conditional Apply Rendering =================
  const showApplyButton =
    user?.email !== "manager@loanmate.com" && user?.email !== "admin@loanmate.com";

  const { data: loans = [], isLoading, isError } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/loans`);
      return data;
    },
  });

  if (isLoading) return <div className="text-center mt-10">Loading loans...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error fetching loans!</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Loans</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* শুধুমাত্র প্রথম 12টি কার্ড দেখাবে */}
        {loans.slice(0, 12).map((loan) => (
          <div
            key={loan._id}
            className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            {loan.image && <img src={loan.image} alt={loan.title} className="w-full h-48 object-cover" />}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{loan.title}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Category:</span> {loan.category || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Interest:</span> {loan.interest || 0}%
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Max Limit:</span> ৳{loan.maxLimit || 0}
              </p>

              <Link to={`/loan-details/${loan._id}`} state={{ loans }}>
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mb-2">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLoans;
