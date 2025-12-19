import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import axiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyLoans = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: loans = [], isLoading, error } = useQuery({
    queryKey: ["my-loans", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/loan-applications?email=${user.email}`);
      return res.data;
    },
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
      if (res.data?.url) window.location.href = res.data.url;
      else Swal.fire("Error", "Payment URL not found", "error");
    } catch {
      Swal.fire("Error", "Could not start payment", "error");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading loans...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to load loans</p>;

  return (
    <div className="p-6">
      <div className="overflow-x-auto shadow-lg rounded-lg border">
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
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No loan applications found
                </td>
              </tr>
            ) : (
              loans.map((loan, index) => (
                <tr key={loan._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <p className="font-semibold">{loan.loanTitle}</p>
                    <p className="text-xs text-gray-500">ID: {loan._id.slice(-6)}</p>
                  </td>
                  <td className="border px-4 py-2 text-center">{loan.loanAmount}</td>
                  <td className="border px-4 py-2 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                    {loan.feeStatus === "paid" ? (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Paid
                      </span>
                    ) : (
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Unpaid
                      </span>
                    )}
                  </td>

                  <td className="border px-4 py-2 flex flex-col md:flex-row gap-1 justify-center items-center">
                    <button
                      onClick={() => handleViewDetails(loan)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                    >
                      View
                    </button>

                    {loan.feeStatus === "unpaid" && (
                   <button
    onClick={() => handlePayFee(loan)}
    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
  >
    Pay
  </button>
                    )}

                    {loan.status === "Pending" && (
                      <button
                        onClick={() => handleCancelLoan(loan._id)}
                        disabled={cancelMutation.isLoading}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
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