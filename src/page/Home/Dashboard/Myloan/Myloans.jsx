import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import axiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom"; // Link 'react-router-dom' থেকে ইম্পোর্ট করা হলো (কারণ আপনি এটি ব্যবহার করেননি, তবে React অ্যাপে এটিই ব্যবহৃত হয়)

const MyLoans = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

const { data: loans = [], refetch } = useQuery({
  queryKey: ["my-loans", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/loan-applications?email=${user.email}`);
    return res.data;
  },
  refetchOnWindowFocus: true,
  refetchOnMount: true,
});





  const cancelMutation = useMutation({
    mutationFn: async (loanId) => {
      const res = await axiosSecure.patch(`/loan-applications/${loanId}`, { status: "Cancelled" });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Cancelled!", "Your loan application has been cancelled.", "success");
      queryClient.invalidateQueries(["my-loans", user?.email]);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Could not cancel loan";
      Swal.fire("Error!", message, "error");
    },
  });

  const handleViewDetails = (loan) => {
    Swal.fire({
      title: loan.loanTitle,
      icon: "info",
      html: `
        <p><b>Loan ID:</b> ${loan._id}</p>
        <p><b>Amount:</b> ${loan.loanAmount} BDT</p>
        <p><b>Status:</b> ${loan.status}</p>
        <p><b>Fee Status:</b> ${loan.feeStatus}</p>
      `,
      confirmButtonText: "Close",
    });
  };

  const handleCancelLoan = (loanId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) cancelMutation.mutate(loanId);
    });
  };

  const handlePayFee = async (loan) => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        loanId: loan._id,
        loanTitle: loan.loanTitle,
        email: user.email,
      });
      // Payment URL পেলে ইউজারকে সেখানে রিডাইরেক্ট করা হচ্ছে
      if (res.data?.url) window.location.href = res.data.url;
      else Swal.fire("Error", "Payment URL not found", "error");
    } catch (e) {
      console.error("Payment initiation error:", e);
      Swal.fire("Error", "Could not start payment", "error");
    }
  };

  // ম্যানুয়ালি ডেটা রিফ্রেশ করার ফাংশন
  const handleRefreshStatus = () => {
      refetch();
      Swal.fire({
          title: "Refreshing Status...", 
          text: "Fetching latest loan statuses from server.", 
          icon: "info",
          showConfirmButton: false,
          timer: 1500
      });
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">My Loan Applications</h2>
        
        {/* পেমেন্টের পর স্ট্যাটাস আপডেটের জন্য ম্যানুয়াল রিফ্রেশ বাটন যোগ করা হলো */}
        <button
          onClick={handleRefreshStatus}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition duration-150 ease-in-out flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-lg border">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-4 py-3">#</th>
              <th className="border px-4 py-3">Loan Info</th>
              <th className="border px-4 py-3">Amount (BDT)</th>
              <th className="border px-4 py-3">Status</th>
              <th className="border px-4 py-3">Application Fee</th>
              <th className="border px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500 font-medium">
                  No loan applications found.
                </td>
              </tr>
            ) : (
              loans.map((loan, index) => (
                <tr key={loan._id} className="hover:bg-gray-50 transition duration-75">
                  <td className="border px-4 py-2 text-center font-medium">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <p className="font-semibold text-gray-800">{loan.loanTitle}</p>
                    <p className="text-xs text-gray-500">ID: {loan._id.slice(-6)}</p>
                  </td>
                  <td className="border px-4 py-2 text-center font-medium">{loan.loanAmount}</td>
                  <td className="border px-4 py-2 text-center">
                    {/* Loan Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        loan.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : loan.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : loan.status === "Cancelled"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {/* Fee Status Badge */}
                    {loan.feeStatus === "paid" ? (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        Paid
                      </span>
                    ) : (
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        Unpaid
                      </span>
                    )}
                  </td>

                  <td className="border px-4 py-2 flex flex-col md:flex-row gap-2 justify-center items-center">
                    {/* View Details */}
                    <button
                      onClick={() => handleViewDetails(loan)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition duration-150"
                    >
                      View
                    </button>

                    {/* Pay Button (Visible if Unpaid) */}
                    {loan.feeStatus === "unpaid" && (
                      <button
                        onClick={() => handlePayFee(loan)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition duration-150"
                      >
                        Pay Fee
                      </button>
                    )}

                    {/* Cancel Button (Visible if Pending) */}
                    {loan.status === "Pending" && (
                      <button
                        onClick={() => handleCancelLoan(loan._id)}
                        disabled={cancelMutation.isLoading}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition duration-150 disabled:opacity-50"
                      >
                        {cancelMutation.isLoading ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLoans;