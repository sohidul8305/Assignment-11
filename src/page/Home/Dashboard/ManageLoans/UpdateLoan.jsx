import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const API = "https://loanmate-nine.vercel.app";

const UpdateLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data: loan = {}, isLoading } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/loans/${id}`);
      return data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const updatedLoan = {
      title: form.title.value,
      category: form.category.value,
      interest: Number(form.interest.value),
      maxLimit: Number(form.amount.value),
      shortDesc: form.description.value,
      image: form.image.value,
      emiPlans: form.emiPlans.value.split(",").map((p) => p.trim()),
    };

    try {
      const res = await axios.put(`${API}/loans/${id}`, updatedLoan);
      if (res.data.success) {
        toast.success("Loan updated successfully ✅");
        queryClient.invalidateQueries(["loans"]);
        navigate("/dashboard/manage-loans"); // Redirect back to Manage Loans
      } else {
        toast.error(`Failed to update loan ❌ ${res.data.error || ""}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update loan ❌");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading loan...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">Update Loan</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Loan Title</label>
          <input name="title" defaultValue={loan.title} required className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Short Description</label>
          <textarea name="description" defaultValue={loan.shortDesc} required className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Category</label>
          <input name="category" defaultValue={loan.category} required className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Interest Rate (%)</label>
          <input name="interest" type="number" defaultValue={loan.interest} required className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Max Loan Limit</label>
          <input name="amount" type="number" defaultValue={loan.maxLimit} required className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">EMI Plans</label>
          <input
            name="emiPlans"
            placeholder="6 Months, 12 Months, 24 Months"
            defaultValue={loan.emiPlans?.join(", ")}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Image URL</label>
          <input name="image" type="url" defaultValue={loan.image} required className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <button disabled={loading} className="w-full py-3 bg-primary text-white font-bold rounded-lg">
          {loading ? "Updating Loan..." : "Update Loan"}
        </button>
      </form>
    </div>
  );
};

export default UpdateLoan;
