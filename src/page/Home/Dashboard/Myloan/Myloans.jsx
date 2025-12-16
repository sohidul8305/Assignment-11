// MyLoans.jsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2';
import useAuth from "../../../../hooks/useAuth";
import axiosSecure from "../../../../hooks/useAxiosSecure";

const MyLoans = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // --- ১. ডেটা ফেচিং (অপরিবর্তিত) ---
    const { data: loans = [], isLoading, error } = useQuery({
        queryKey: ["my-loans", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/loan-applications?email=${user.email}`);
            return res.data;
        },
    });

    // --- ২. ক্যানসেল মিউটেশন (অপরিবর্তিত, এখন ব্যাকএন্ড রুট আছে) ---
    const cancelMutation = useMutation({
        mutationFn: async (loanId) => {
            // এই PATCH কলটি এখন server.js-এ যোগ করা app.patch রুটটি ব্যবহার করবে।
            const res = await axiosSecure.patch(`/loan-applications/${loanId}`, { status: 'Cancelled' });
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Cancelled!', 'Your loan application has been cancelled.', 'success');
            queryClient.invalidateQueries(["my-loans", user?.email]);
        },
        onError: (err) => {
             console.error("Cancellation error:", err);
             Swal.fire('Error!', 'Could not cancel the application. Check backend.', 'error');
        }
    });

    // --- ৩. হ্যান্ডলার ফাংশন ---
    
    // ... handleViewDetails, handleCancelLoan (অপরিবর্তিত) ...

    const handleViewDetails = (loan) => {
        Swal.fire({
            title: loan.loanTitle,
            html: `<p><b>Loan ID:</b> ${loan._id}</p><p><b>Amount:</b> ${loan.loanAmount} BDT</p><p><b>Status:</b> ${loan.status}</p><p><b>Fee Status:</b> ${loan.feeStatus}</p>`,
            icon: 'info',
            confirmButtonText: 'Close'
        });
    };

    const handleCancelLoan = (loanId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                cancelMutation.mutate(loanId);
            }
        });
    };
    
    // **পেমেন্ট হ্যান্ডলার (সংশোধিত)**
    const handlePayFee = async (loan) => {
        if (!user?.email) {
            Swal.fire('Error', 'User not logged in.', 'error');
            return;
        }

        try {
            // /create-checkout-session রুটে API কল করা হলো
            const res = await axiosSecure.post('/create-checkout-session', {
                loanId: loan._id,
                loanTitle: loan.loanTitle,
                email: user.email, 
            });

            // Stripe URL পেলে সেখানে রিডাইরেক্ট
            if (res.data.url) {
                window.location.href = res.data.url;
            } else {
                Swal.fire('Error', 'Failed to get payment URL.', 'error');
            }
        } catch (err) {
            console.error("Stripe Checkout Error:", err);
            Swal.fire('Error', 'Could not initiate payment. Please check server logs.', 'error');
        }
    };


    // --- ৪. রেন্ডারিং (অপরিবর্তিত) ---
    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">Error loading loans: {error.message}</p>;

    return (
        <div className="p-6">
            {/* ... table rendering code ... */}
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="border px-4 py-3">#</th>
                            <th className="border px-4 py-3">Loan Info</th>
                            <th className="border px-4 py-3">Amount (BDT)</th>
                            <th className="border px-4 py-3">Status</th>
                            <th className="border px-4 py-3">Fee Status</th>
                            <th className="border px-4 py-3">Actions</th> 
                        </tr>
                    </thead>

                    <tbody>
                        {loans.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">No loan applications found</td>
                            </tr>
                        ) : (
                            loans.map((loan, index) => (
                                <tr key={loan._id} className="hover:bg-gray-50 transition duration-100">
                                    <td className="border px-4 py-2 text-center text-sm">{index + 1}</td>
                                    <td className="border px-4 py-2 font-medium text-gray-800">
                                        {loan.loanTitle}
                                        <span className="block text-xs text-gray-500">ID: {loan._id.slice(-6)}</span>
                                    </td>
                                    <td className="border px-4 py-2 text-center">{loan.loanAmount}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            loan.status === "Approved" ? "bg-green-100 text-green-700" :
                                            loan.status === "Rejected" ? "bg-red-100 text-red-700" :
                                            loan.status === "Cancelled" ? "bg-gray-200 text-gray-700" :
                                            "bg-yellow-100 text-yellow-700"
                                        }`}>
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {/* Fee Status Badge */}
                                        {loan.feeStatus === 'paid' ? (
                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                Unpaid
                                            </span>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2 space-y-1 md:space-x-1 flex flex-col md:flex-row justify-center items-center gap-1">
                                        
                                        {/* View Button */}
                                        <button 
                                            onClick={() => handleViewDetails(loan)}
                                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-xs transition duration-150 w-full md:w-auto"
                                        >
                                            View
                                        </button>

                                        {/* Pay Button (Visible only if feeStatus is Unpaid) */}
                                        {loan.feeStatus === 'unpaid' && (
                                            <button 
                                                onClick={() => handlePayFee(loan)}
                                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs transition duration-150 w-full md:w-auto"
                                            >
                                                Pay
                                            </button>
                                        )}
                                        
                                        {/* Cancel Button (Visible only if status is Pending) */}
                                        {loan.status === 'Pending' && (
                                            <button 
                                                onClick={() => handleCancelLoan(loan._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs transition duration-150 w-full md:w-auto"
                                                disabled={cancelMutation.isLoading}
                                            >
                                                {cancelMutation.isLoading ? 'Cancelling...' : 'Cancel'}
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