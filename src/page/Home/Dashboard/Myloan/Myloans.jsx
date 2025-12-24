import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import axiosSecure from "../../../../hooks/useAxiosSecure";

const MyLoans = () => {
  const { user, loading: authLoading } = useAuth(); // 🔹 auth loading check
  const queryClient = useQueryClient();

  // ======================
  // FETCH MY LOANS
  // ======================
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["my-loans", user?.email],
    enabled: !!user?.email, // 🔹 only fetch when email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/loan-applications?email=${user.email}`);
      return res.data;
    },
  });

  // ======================
  // CANCEL LOAN
  // ======================
  const cancelMutation = useMutation({
    mutationFn: async (loanId) =>
      axiosSecure.patch(`/loan-applications/${loanId}`, { status: "Cancelled" }),
    onSuccess: () => {
      Swal.fire("Cancelled!", "Loan cancelled successfully.", "success");
      queryClient.invalidateQueries(["my-loans", user?.email]);
    },
  });

  // ======================
  // START PAYMENT (dummy, structure preserved)
  // ======================
  const handlePayFee = async (loan) => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        loanId: loan._id,
        loanTitle: loan.loanTitle,
        email: user.email,
      });

      if (res.data?.url) window.location.href = res.data.url;
      else Swal.fire("Error", "Payment URL not found", "error");
    } catch (err) {
      Swal.fire("Error", "Could not start payment", "error");
    }
  };

  // ======================
  // PAID MODAL
  // ======================
  const handleViewPayment = (loan) => {
    Swal.fire({
      title: "Payment Successful 🎉",
      icon: "success",
      html: `
        <div style="text-align:left">
          <p><b>Loan Title:</b> ${loan.loanTitle}</p>
          <p><b>Loan ID:</b> ${loan._id}</p>
          <p><b>Amount:</b> ${loan.loanAmount} BDT</p>
          <p><b>Status:</b> ${loan.status}</p>
          <p><b>Fee Status:</b> Paid</p>
          <p><b>Transaction ID:</b> TXN-${loan._id.slice(-8)}</p>
        </div>
      `,
      confirmButtonText: "Close",
    });
  };

  // ======================
  // VIEW LOAN DETAILS
  // ======================
  const handleViewLoan = (loan) => {
    Swal.fire({
      title: loan.loanTitle,
      icon: "info",
      html: `
        <p><b>Loan ID:</b> ${loan._id}</p>
        <p><b>Amount:</b> ${loan.loanAmount} BDT</p>
        <p><b>Status:</b> ${loan.status}</p>
        <p><b>Fee Status:</b> ${loan.feeStatus}</p>
      `,
    });
  };

  console.log("USER OBJECT:", user); // debug

  // 🔹 Loading / not logged in handling
  if (authLoading || isLoading) return <p className="p-6">Loading...</p>;
  if (!user?.email) return <p className="p-6 text-red-500">User not logged in</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Loan Applications</h2>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Loan</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Fee</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
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
                  <td className="border px-4 py-2 text-center">{loan.status}</td>

                  <td className="border px-4 py-2 text-center">
                    {loan.feeStatus === "paid" ? (
                      <button
                        onClick={() => handleViewPayment(loan)}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200"
                      >
                        Paid
                      </button>
                    ) : (
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Unpaid
                      </span>
                    )}
                  </td>

                  <td className="border px-4 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleViewLoan(loan)}
                      className="bg-gray-500 text-white px-3 py-1 rounded text-xs"
                    >
                      View
                    </button>

                    {loan.feeStatus === "unpaid" && (
                      <button
                        onClick={() => handlePayFee(loan)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Pay Fee
                      </button>
                    )}

                    {loan.status === "Pending" && (
                      <button
                        onClick={() => cancelMutation.mutate(loan._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                      >
                        Cancel
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
