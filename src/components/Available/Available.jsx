import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading";
import { Link } from "react-router";

const fetchLoans = async () => {
  const res = await axios.get("http://localhost:4000/loans?limit=6");
  return res.data;
};

const Available = () => {
  const { data: loans = [], isLoading, isError } = useQuery({
    queryKey: ["loans-home"],
    queryFn: fetchLoans,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-center py-10 text-red-600">Error fetching loans!</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
          Available Loans 💰
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="bg-white shadow-xl rounded-xl overflow-hidden transform transition duration-500 hover:scale-[1.03] hover:shadow-2xl border-b-4 border-green-600"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={loan.image}
                  alt=""
                  className="w-full h-full object-cover transition duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <p className="text-gray-500 mb-3 text-sm line-clamp-2">
                  {loan.shortDesc}
                </p>

                <p className="font-extrabold text-lg text-gray-800 border-t pt-3 mt-3 border-gray-100">
                  Max Loan: <span className="text-green-600">{loan.maxLimit}</span>
                </p>

                <Link to={`/loan-details/${loan._id}`}>
                  <button className="mt-5 w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-800 transition duration-300 transform hover:-translate-y-0.5">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Available;
