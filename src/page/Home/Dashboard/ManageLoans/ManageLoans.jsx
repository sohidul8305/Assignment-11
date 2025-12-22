import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API = "http://localhost:4000";

const ManageLoans = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Fetch all loans
  const { data: loans = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/loans`);
      return data;
    },
  });

  // Delete loan
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this loan?")) return;

    try {
      const res = await axios.delete(`${API}/loans/${id}`);
      if (res.data.success) {
        toast.success("Loan deleted successfully ✅");
        refetch();
      } else {
        toast.error("Failed to delete loan ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete loan ❌");
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading loans...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error fetching loans!</div>;

  // Filter loans by search
  const filteredLoans = loans.filter(
    (loan) =>
      loan.title?.toLowerCase().includes(search.toLowerCase()) ||
      loan.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Loans</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Loans Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Interest (%)</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan._id} className="text-center">
                <td className="py-2 px-4 border">
                  {loan.image ? <img src={loan.image} alt={loan.title} className="w-20 h-16 object-cover mx-auto rounded" /> : "N/A"}
                </td>
                <td className="py-2 px-4 border">{loan.title}</td>
                <td className="py-2 px-4 border">{loan.interest}%</td>
                <td className="py-2 px-4 border">{loan.category}</td>
                <td className="py-2 px-4 border space-x-2">
                  {/* Update Button */}
                  <button
                    onClick={() => navigate(`/dashboard/update-loan/${loan._id}`)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredLoans.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No loans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLoans;
