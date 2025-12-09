// src/page/Home/Allloans/Allloans.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchLoans = async () => {
  const res = await axios.get("http://localhost:4000/loans"); // সব লোন fetch
  return res.data;
};

const Allloans = () => {
  const { data: loans, isLoading, isError } = useQuery({
    queryKey: ["loans"],
    queryFn: fetchLoans,
  });

  if (isLoading) return <div className="text-center mt-10">Loading loans...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error fetching loans!</div>;

  // শুধু প্রথম 12 টা লোন দেখাবে
  const loansToShow = loans.slice(0, 12);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Loans</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loansToShow.map((loan) => (
          <div
            key={loan._id}
            className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <img
              src={loan.image}
              alt={loan.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{loan.title}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Category:</span> {loan.category}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Interest:</span> {loan.interest}%
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Max Limit:</span> ৳{loan.maxLimit}
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allloans;
