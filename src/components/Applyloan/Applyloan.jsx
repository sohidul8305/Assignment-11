import React from 'react';
import { useForm } from 'react-hook-form';
import axiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Applyloan = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to save the loan product "${data.title}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post('/loans', data)
          .then(res => {
            console.log('Saved data:', res.data);
            Swal.fire(
              'Saved!',
              `Loan product "${data.title}" has been saved successfully.`,
              'success'
            );
            reset();
          })
          .catch(err => {
            console.error('Error:', err);
            Swal.fire(
              'Error!',
              'There was an issue saving the data.',
              'error'
            );
          });
      }
    });
  };

  const inputClass = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150";
  const errorClass = "text-red-600 text-sm mt-1 font-semibold";

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-xl my-10 border-t-4 border-green-600">
      <h2 className="text-3xl font-extrabold text-center text-green-700 mb-2">Add Loan Product</h2>
      <p className="text-center text-gray-500 mb-8 text-sm">Add image, title, limit, and short description.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <label className="block text-sm font-medium text-gray-800">Loan Product Name:</label>
          <input type="text" {...register("title", { required: true })} placeholder="e.g., Personal Loan" className={inputClass} />
          {errors.title && <p className={errorClass}>Title is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">Maximum Loan Amount:</label>
          <input type="text" {...register("maxLimit", { required: true })} placeholder="৳ 50,00,000 or $50,000" className={inputClass} />
          {errors.maxLimit && <p className={errorClass}>Maximum Limit is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">Card Image URL:</label>
          <input type="url" {...register("imageURL", { required: true })} placeholder="https://example.com/image.jpg" className={inputClass} />
          {errors.imageURL && <p className={errorClass}>Image URL is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">Short Description:</label>
          <textarea {...register("shortDesc", { required: true })} rows="4" placeholder="Short description..." className={inputClass}></textarea>
          {errors.shortDesc && <p className={errorClass}>Description is required</p>}
        </div>

        <button type="submit" className="w-full py-3 px-4 rounded-md shadow-lg text-lg font-medium text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition transform hover:scale-[1.01]">
          Save Product Data
        </button>
      </form>
    </div>
  );
};

export default Applyloan;
