import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";

const MyLoans = () => {
  const { user } = useAuth();
  const userEmail = user?.email;

  const { data: loans = [], isLoading, isError } = useQuery({
    queryKey: ["my-loans", userEmail],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:4000/loans?userEmail=${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  if (!userEmail) return <div className="text-center mt-10">No email provided</div>;
  if (isLoading) return <div className="text-center mt-10">Loading loans...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error fetching loans</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Loans for: {userEmail}</h2>
      {loans.length === 0 ? (
        <p>No loan applications found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Loan Title</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan._id}>
                <td className="border px-4 py-2">{index + 1}</td> {/* ক্রমানুসারে 1,2,3 */}
                <td className="border px-4 py-2">{loan.loanTitle}</td>
                <td className="border px-4 py-2">${loan.loanAmount}</td>
                <td className="border px-4 py-2">
                  {loan.status}
                  {loan.feeStatus === "Paid" && (
                    <span className="ml-2 text-green-600 font-semibold">Paid</span>
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => alert(`View loan ${loan._id}`)}
                  >
                    View
                  </button>
                  {loan.status === "Pending" && (
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => alert(`Cancel loan ${loan._id}`)}
                    >
                      Cancel
                    </button>
                  )}
                  {loan.feeStatus === "unpaid" && (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => alert(`Pay for loan ${loan._id}`)}
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyLoans;
