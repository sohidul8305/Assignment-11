import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

// API call
const fetchLoans = async () => {
  const res = await axios.get("http://localhost:4000/loans");
  return res.data;
};

const Available = () => {
  const {
    data: loans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["available-loans"],
    queryFn: fetchLoans,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600">
        Error fetching loans!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
          Available Loans 💰
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loans.slice(0, 6).map((loan) => (
            <div
              key={loan._id}
              className="bg-white shadow-xl rounded-xl overflow-hidden transition duration-300 hover:shadow-2xl border-b-4 border-green-600"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={loan.image || "https://via.placeholder.com/400x250"}
                  alt={loan.title || "Loan Image"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* ✅ TITLE */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {loan.title || "Loan Title"}
                </h3>

                <p className="text-gray-500 mb-3 text-sm line-clamp-2">
                  {loan.shortDesc || "No description available."}
                </p>

                <p className="font-semibold text-gray-800 border-t pt-3 mt-3 border-gray-100">
                  Max Loan:{" "}
                  <span className="text-green-600">
                    ৳{loan.maxLimit || "N/A"}
                  </span>
                </p>

                <Link
                  to={`/available-details/${loan._id}`}
                  state={{ loan }}
                >
                  <button className="btn btn-primary w-full mt-4">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No data */}
        {loans.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No loans available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default Available;
