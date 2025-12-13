import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import Modal from "react-modal";

Modal.setAppElement("#root");

const API = "http://localhost:4000";

const MyLoans = () => {
  const { user } = useAuth();
  const userEmail = user?.email;

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { data: loans = [], isLoading, refetch } = useQuery({
    queryKey: ["my-loans", userEmail],
    queryFn: async () => {
      const res = await axios.get(`${API}/loans?userEmail=${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  // Auto-refresh every 5 sec to update feeStatus after payment
  useEffect(() => {
    const interval = setInterval(refetch, 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  const handleViewLoan = (loan) => {
    setSelectedLoan(loan);
    setIsViewModalOpen(true);
  };

  const handlePayment = async (loan) => {
    try {
      const res = await axios.post(`${API}/create-checkout-session`, {
        loanId: loan._id,
        loanTitle: loan.loanTitle,
        email: userEmail,
      });
      window.location.href = res.data.url;
    } catch (err) {
      Swal.fire("Error", "Payment failed", "error");
    }
  };

  const handleCancelLoan = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel loan?",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      await axios.delete(`${API}/loans/${id}`);
      refetch();
      Swal.fire("Cancelled", "", "success");
    }
  };

  if (!userEmail) return <p>Please login</p>;
  if (isLoading) return <p>Loading loans...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Loans for {userEmail}</h2>

      {loans.length === 0 ? (
        <p>No loan applications found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Loan Title</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Fee Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{loan.loanTitle}</td>
                <td className="border px-4 py-2">${loan.loanAmount}</td>
                <td className="border px-4 py-2">{loan.feeStatus}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleViewLoan(loan)}
                  >
                    View
                  </button>

                  {loan.feeStatus === "unpaid" && (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handlePayment(loan)}
                    >
                      Pay $10
                    </button>
                  )}

                  {loan.feeStatus === "Paid" && (
                    <button
                      className="bg-gray-300 text-green-600 font-semibold px-2 py-1 rounded"
                      onClick={() => {
                        setSelectedLoan(loan);
                        setIsPaymentModalOpen(true);
                      }}
                    >
                      Paid
                    </button>
                  )}

                  {loan.status === "Pending" && (
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleCancelLoan(loan._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* VIEW Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onRequestClose={() => setIsViewModalOpen(false)}
        className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-xl shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {selectedLoan && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedLoan.loanTitle}</h2>
            <p><strong>Amount:</strong> ${selectedLoan.loanAmount}</p>
            <p><strong>Status:</strong> {selectedLoan.status}</p>
            <p><strong>Fee Status:</strong> {selectedLoan.feeStatus}</p>
            <p><strong>Interest Rate:</strong> {selectedLoan.interestRate || 0}%</p>
            <p><strong>Application Date:</strong>{" "}
              {new Date(selectedLoan.applicationDate).toLocaleString()}
            </p>
            <p><strong>Reason:</strong> {selectedLoan.reasonForLoan || "N/A"}</p>
            <p><strong>Address:</strong> {selectedLoan.address || "N/A"}</p>
            <div className="mt-4 text-right">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* PAID Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onRequestClose={() => setIsPaymentModalOpen(false)}
        className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-xl shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {selectedLoan?.payment && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
            <p><strong>Email:</strong> {selectedLoan.payment.email}</p>
            <p><strong>Transaction ID:</strong> {selectedLoan.payment.transactionId}</p>
            <p><strong>Loan:</strong> {selectedLoan.payment.loanTitle}</p>
            <p><strong>Amount:</strong> $10</p>
            <p><strong>Date:</strong> {new Date(selectedLoan.payment.date).toLocaleString()}</p>
            <div className="mt-4 text-right">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyLoans;
