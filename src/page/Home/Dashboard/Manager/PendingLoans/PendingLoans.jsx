import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const API = "https://loanmate-nine.vercel.app";

const PendingLoans = () => {
  const queryClient = useQueryClient();
  const [viewLoan, setViewLoan] = useState(null);

  // FETCH pending loans
  const { data: loans = [], isLoading, isError, error } = useQuery({
    queryKey: ["pending-loans"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API}/loan-applications?status=Pending`);
        return res.data; // If backend returns { loans: [...] }, use res.data.loans
      } catch (err) {
        console.error("Fetch loans error:", err.response || err.message);
        throw err; // React Query will catch this
      }
    },
  });

  // Approve loan
  const approveMutation = useMutation({
    mutationFn: (loanId) =>
      axios.patch(`${API}/loan-applications/${loanId}`, {
        status: "Approved",
        approvedAt: new Date(),
      }),
    onSuccess: () => {
      toast.success("Loan Approved ✅");
      queryClient.invalidateQueries(["pending-loans"]);
    },
    onError: (err) => toast.error(`Failed to approve loan ❌: ${err.message}`),
  });

  // Reject loan
  const rejectMutation = useMutation({
    mutationFn: (loanId) =>
      axios.patch(`${API}/loan-applications/${loanId}`, { status: "Rejected" }),
    onSuccess: () => {
      toast.success("Loan Rejected ❌");
      queryClient.invalidateQueries(["pending-loans"]);
    },
    onError: (err) => toast.error(`Failed to reject loan ❌: ${err.message}`),
  });

  if (isLoading) return <p className="text-center mt-10">Loading pending loans...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading loans: {error?.response?.data?.message || error?.message}
      </p>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Pending Loan Applications</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Loan ID</th>
              <th className="border p-2">Borrower</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No pending loans found.
                </td>
              </tr>
            ) : (
              loans.map((loan) => (
                <tr key={loan._id} className="text-center">
                  <td className="border p-2">{loan._id}</td>
                  <td className="border p-2">
                    {loan.borrowerName} <br /> <small>{loan.userEmail}</small>
                  </td>
                  <td className="border p-2">৳{loan.loanAmount}</td>
                  <td className="border p-2">
                    {loan.applicationDate
                      ? new Date(loan.applicationDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => approveMutation.mutate(loan._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(loan._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => setViewLoan(loan)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Loan Details Modal */}
      {viewLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Loan Details</h2>
            <p><strong>Loan ID:</strong> {viewLoan._id}</p>
            <p><strong>Borrower Name:</strong> {viewLoan.borrowerName}</p>
            <p><strong>Email:</strong> {viewLoan.userEmail}</p>
            <p><strong>Loan Title:</strong> {viewLoan.loanTitle}</p>
            <p><strong>Amount:</strong> ৳{viewLoan.loanAmount}</p>
            <p>
              <strong>Application Date:</strong>{" "}
              {new Date(viewLoan.applicationDate).toLocaleDateString()}
            </p>
            <p><strong>Status:</strong> {viewLoan.status}</p>
            <p><strong>Approved At:</strong>{" "}
              {viewLoan.approvedAt ? new Date(viewLoan.approvedAt).toLocaleString() : "N/A"}
            </p>
            <button
              onClick={() => setViewLoan(null)}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingLoans;
