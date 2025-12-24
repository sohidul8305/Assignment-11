import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = "https://loanmate-nine.vercel.app";

const ApprovedLoans = () => {
  // Fetch approved loans
  const { data: loans = [], isLoading, isError } = useQuery({
    queryKey: ["approved-loans"],
    queryFn: async () => {
      const res = await axios.get(`${API}/loan-applications`);
      return res.data.filter((loan) => loan.status === "Approved");
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading approved loans...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error fetching loans!</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Approved Loan Applications</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Loan ID</th>
              <th className="py-2 px-4 border">Borrower Email</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Approved Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="text-center">
                <td className="py-2 px-4 border">{loan._id}</td>
                <td className="py-2 px-4 border">{loan.userEmail || "N/A"}</td>
                <td className="py-2 px-4 border">৳{loan.loanAmount}</td>
                <td className="py-2 px-4 border">
                  {loan.approvedAt
                    ? new Date(loan.approvedAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() =>
                      alert(`Loan ID: ${loan._id}\nBorrower: ${loan.userEmail}\nAmount: ৳${loan.loanAmount}`)
                    }
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedLoans;
