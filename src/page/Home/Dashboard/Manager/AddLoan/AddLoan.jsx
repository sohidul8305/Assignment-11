import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const AddLoan = () => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const loan = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      interestRate: form.interest.value,
      maxAmount: form.amount.value,
      createdAt: new Date(),
      showOnHome: form.show.checked
    };

    await axiosSecure.post("/loans", loan);
    toast.success("Loan added successfully ✅");
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Loan Title" />
      <textarea name="description" />
      <input name="category" />
      <input name="interest" />
      <input name="amount" />
      <input type="checkbox" name="show" /> Show on Home
      <button>Add Loan</button>
    </form>
  );
};

export default AddLoan;
