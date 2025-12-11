import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import Modal from "react-modal";

// Modal accessibility
Modal.setAppElement("#root");

const MyLoans = () => {
  const { user } = useAuth();
  const userEmail = user?.email;

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: loans = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["my-loans", userEmail],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:4000/loans?userEmail=${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  const handleViewLoan = (loan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLoan(null);
    setIsModalOpen(false);
  };

  const handleCancelLoan = (loanId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this loan application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:4000/loans/${loanId}`);
          if (res.data.success) {
            Swal.fire("Cancelled!", "Your loan application has been cancelled.", "success");
            refetch(); // refresh the list
          } else {
            Swal.fire("Error!", res.data.message || "Failed to cancel loan.", "error");
          }
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error");
          console.error(err);
        }
      }
    });
  };

  if (!userEmail) return <div className="text-center mt-10">No email provided</div>;
  if (isLoading) return <div className="text-center mt-10">Loading loans...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error fetching loans</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Loans for: {userEmail}</h2>
      {loans.length === 0 ? (
        <p>No loan applications found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Loan Title</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{loan.loanTitle}</td>
                <td className="border px-4 py-2">${loan.loanAmount}</td>
                <td className="border px-4 py-2">
                  {loan.status}
                  {loan.feeStatus === "Paid" && (
                    <span className="ml-2 text-green-600 font-semibold">Paid</span>
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  {/* View Button */}
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleViewLoan(loan)}
                  >
                    View
                  </button>

                  {/* Cancel Button only for Pending */}
                  {loan.status === "Pending" && (
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleCancelLoan(loan._id)}
                    >
                      Cancel
                    </button>
                  )}

                  {/* Pay Button for unpaid */}
                  {loan.feeStatus === "unpaid" && (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => alert(`Pay for loan ${loan._id}`)}
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for viewing loan details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Loan Details"
        className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-xl shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {selectedLoan && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedLoan.loanTitle}</h2>
            <p><strong>Amount:</strong> ${selectedLoan.loanAmount}</p>
            <p><strong>Status:</strong> {selectedLoan.status}</p>
            <p><strong>Fee Status:</strong> {selectedLoan.feeStatus}</p>
            <p><strong>Interest Rate:</strong> {selectedLoan.interestRate}%</p>
            <p><strong>Application Date:</strong> {new Date(selectedLoan.applicationDate).toLocaleString()}</p>
            <p><strong>Reason:</strong> {selectedLoan.reasonForLoan || "N/A"}</p>
            <p><strong>Address:</strong> {selectedLoan.address || "N/A"}</p>
            <div className="mt-4 text-right">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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
