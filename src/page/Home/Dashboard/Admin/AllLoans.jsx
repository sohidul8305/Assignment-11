import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const API = "http://localhost:4000";

const AllLoans = () => {
  const queryClient = useQueryClient();
  const [selectedLoan, setSelectedLoan] = useState(null);

  // Fetch all loans
  const { data: loans = [], isLoading, isError } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axios.get(`${API}/loans`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Update loan mutation
  const updateLoanMutation = useMutation({
    mutationFn: async ({ _id, updates }) => {
      const res = await axios.patch(`${API}/loans/${_id}`, { updates });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Loan updated successfully");
      queryClient.invalidateQueries(["loans"]);
      setSelectedLoan(null);
    },
    onError: (err) => {
      toast.error("Failed to update loan");
      console.error(err.response?.data || err.message);
    },
  });

  // Delete loan mutation
  const deleteLoanMutation = useMutation({
    mutationFn: async (loanId) => {
      const res = await axios.delete(`${API}/loans/${loanId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Loan deleted successfully");
      queryClient.invalidateQueries(["loans"]);
    },
    onError: (err) => {
      toast.error("Failed to delete loan");
      console.error(err.response?.data || err.message);
    },
  });

  if (isLoading) return <p>Loading loans...</p>;
  if (isError) return <p className="text-red-500">Error loading loans</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Loans</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Interest</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Created By</th>
              <th className="border p-2">Show on Home</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No loans found.
                </td>
              </tr>
            ) : (
              loans.map((loan) => (
                <tr key={loan._id} className="text-center">
                  <td className="border p-2">
                    <img
                      src={loan.image}
                      alt={loan.title}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="border p-2">{loan.title}</td>
                  <td className="border p-2">{loan.interest}%</td>
                  <td className="border p-2">{loan.category}</td>
                  <td className="border p-2">{loan.createdBy || "N/A"}</td>
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={loan.showOnHome || false}
                      onChange={(e) =>
                        updateLoanMutation.mutate({
                          _id: loan._id,
                          updates: { showOnHome: e.target.checked },
                        })
                      }
                    />
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => setSelectedLoan(loan)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete "${loan.title}"?`
                          )
                        ) {
                          deleteLoanMutation.mutate(loan._id);
                        }
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Loan</h2>

            <div className="mt-2">
              <label className="block mb-1 font-medium">Title:</label>
              <input
                type="text"
                value={selectedLoan.title}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, title: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="mt-2">
              <label className="block mb-1 font-medium">Category:</label>
              <input
                type="text"
                value={selectedLoan.category}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, category: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="mt-2">
              <label className="block mb-1 font-medium">Interest:</label>
              <input
                type="number"
                value={selectedLoan.interest}
                onChange={(e) =>
                  setSelectedLoan({
                    ...selectedLoan,
                    interest: Number(e.target.value),
                  })
                }
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="mt-2">
              <label className="block mb-1 font-medium">Max Loan Limit:</label>
              <input
                type="number"
                value={selectedLoan.maxLimit}
                onChange={(e) =>
                  setSelectedLoan({
                    ...selectedLoan,
                    maxLimit: Number(e.target.value),
                  })
                }
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="mt-2">
              <label className="block mb-1 font-medium">Short Description:</label>
              <textarea
                value={selectedLoan.shortDesc}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, shortDesc: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="mt-2">
              <label className="block mb-1 font-medium">Image URL:</label>
              <input
                type="text"
                value={selectedLoan.image}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, image: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() =>
                  updateLoanMutation.mutate({
                    _id: selectedLoan._id,
                    updates: {
                      title: selectedLoan.title,
                      category: selectedLoan.category,
                      interest: Number(selectedLoan.interest),
                      maxLimit: Number(selectedLoan.maxLimit),
                      shortDesc: selectedLoan.shortDesc,
                      image: selectedLoan.image,
                      showOnHome: selectedLoan.showOnHome || false,
                    },
                  })
                }
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>

              <button
                onClick={() => setSelectedLoan(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllLoans;
