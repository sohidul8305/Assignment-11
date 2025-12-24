import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = "https://loanmate-nine.vercel.app";

const LoanApplications = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loanApplications", statusFilter],
    queryFn: async () => {
      const res = await axios.get(`${API}/loan-applications`, {
        params: statusFilter !== "all" ? { status: statusFilter } : {},
      });
      return res.data;
    },
  });

  if (isLoading) return <p>Loading loan applications...</p>;
  if (isError)
    return <p className="text-red-500">Error loading loan applications</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Loan Applications</h2>

      {/* Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border px-3 py-1 mb-4 rounded"
      >
        <option value="all">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Loan ID</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Loan Category</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No loan applications found.
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app._id} className="text-center">
                <td className="border p-2">{app._id}</td>
                <td className="border p-2">
                  {app.userEmail}
                  <br />
                  {app.borrowerName}
                </td>
                <td className="border p-2">{app.loanTitle}</td>
                <td className="border p-2">{app.loanAmount}</td>
                <td className="border p-2">{app.status}</td>
                <td className="border p-2">
                  <button
                    onClick={() => setSelectedApplication(app)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-3">Loan Details</h3>
            <p><b>Email:</b> {selectedApplication.userEmail}</p>
            <p><b>Name:</b> {selectedApplication.borrowerName}</p>
            <p><b>Phone:</b> {selectedApplication.phone}</p>
            <p><b>Address:</b> {selectedApplication.address}</p>
            <p><b>NID:</b> {selectedApplication.nid}</p>
            <p><b>Status:</b> {selectedApplication.status}</p>

            <button
              className="mt-4 bg-gray-600 text-white px-4 py-1 rounded"
              onClick={() => setSelectedApplication(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplications;
