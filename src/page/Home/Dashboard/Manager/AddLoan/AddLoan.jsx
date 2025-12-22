import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddLoan = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const newLoan = {
      title: form.title.value,
      category: form.category.value,
      interest: Number(form.interest.value),
      maxLimit: Number(form.amount.value),
      shortDesc: form.description.value,
      image: form.image.value,
      emiPlans: form.emiPlans.value.split(",").map((p) => p.trim()),
    };

    try {
      const res = await axios.post("http://localhost:4000/loans", newLoan);
      if (res.data.success) {
        toast.success("Loan added successfully ✅");
        form.reset();
      } else {
        toast.error(`Failed to add loan ❌ ${res.data.error || ""}`);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to add loan ❌");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary";
  const labelClass = "block font-semibold text-gray-700 mb-1";

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">Add New Loan</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={labelClass}>Loan Title</label>
          <input name="title" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Short Description</label>
          <textarea name="description" required className={inputClass}></textarea>
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <input name="category" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Interest Rate (%)</label>
          <input name="interest" type="number" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Max Loan Limit</label>
          <input name="amount" type="number" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>EMI Plans</label>
          <input name="emiPlans" placeholder="6 Months, 12 Months, 24 Months" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Image URL</label>
          <input name="image" type="url" required className={inputClass} />
        </div>
        <button disabled={loading} className="w-full py-3 bg-primary text-white font-bold rounded-lg">
          {loading ? "Adding Loan..." : "Add Loan"}
        </button>
      </form>
    </div>
  );
};

export default AddLoan;
