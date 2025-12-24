import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = "http://localhost:4000";

const LoanApplications = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch loan applications
const { data: applications = [], isLoading, isError, error } = useQuery({
  queryKey: ["loanApplications", statusFilter],
  queryFn: async () => {
    const res = await axios.get(`${API}/loan-applications`, {
      params: statusFilter !== "all" ? { status: statusFilter } : {},
    });
    console.log("API Response:", res.data);
    return Array.isArray(res.data) ? res.data : [];
  },
});

if (isError) {
  console.error("Loan Applications Fetch Error:", error);
  return <p className="text-red-500">Error loading loan applications</p>;
}


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Loan Applications</h2>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Loan ID</th>
              <th className="border p-2">User (Email, Name)</th>
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
                    {app.userEmail} <br /> {app.borrowerName || "N/A"}
                  </td>
                  <td className="border p-2">{app.loanTitle}</td>
                  <td className="border p-2">{app.loanAmount}</td>
                  <td className="border p-2">{app.status}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => setSelectedApplication(app)}
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

      {/* View Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Loan Application Details</h2>
            <p>
              <strong>Loan ID:</strong> {selectedApplication._id}
            </p>
            <p>
              <strong>User Email:</strong> {selectedApplication.userEmail}
            </p>
            <p>
              <strong>User Name:</strong> {selectedApplication.borrowerName}
            </p>
            <p>
              <strong>Loan Title:</strong> {selectedApplication.loanTitle}
            </p>
            <p>
              <strong>Amount:</strong> {selectedApplication.loanAmount}
            </p>
            <p>
              <strong>Status:</strong> {selectedApplication.status}
            </p>
            <p>
              <strong>Applied At:</strong>{" "}
              {selectedApplication.applicationDate
                ? new Date(selectedApplication.applicationDate).toLocaleString()
                : "N/A"}
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplications;
