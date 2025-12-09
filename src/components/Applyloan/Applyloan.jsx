import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
// ধরে নেওয়া হচ্ছে গ্রাহকের ডেটা সেভ করার জন্য আপনার কাছে একটি axiosSecure ইনস্ট্যান্স আছে
// এই ফাইলটি আপনার প্রজেক্টের পাথ অনুযায়ী পরিবর্তন করুন
import axiosSecure from '../../hooks/useAxiosSecure'; 

// === ডামি ডেটা (আসল অ্যাপ্লিকেশনে এটি context/API থেকে আসবে) ===
const DUMMY_USER_DATA = {
    email: "user.example@email.com",
    loanTitle: "Micro-Business Expansion Loan",
    interestRate: "8.5%",
};
// ==============================================================

const LoanApplicationForm = () => {
    // React Hook Form ব্যবহার করে ফর্ম হ্যান্ডলিং
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        // Read-Only ডেটা যোগ করা হলো
        defaultValues: {
            userEmail: DUMMY_USER_DATA.email,
            loanTitle: DUMMY_USER_DATA.loanTitle,
            interestRate: DUMMY_USER_DATA.interestRate,
        }
    });

    // Axios এর মাধ্যমে ডেটা সাবমিট করার ফাংশন
    const onSubmit = (data) => {
        // আবেদনের জন্য প্রয়োজনীয় অতিরিক্ত ডেটা যোগ করা হলো
        const applicationData = {
            ...data,
            // Status সার্ভার ডিফল্ট হিসেবে 'Pending' হবে, কিন্তু এখানে ক্লায়েন্ট-সাইড ডেটাতে যোগ করা যেতে পারে
            status: 'Pending', 
            applicationDate: new Date().toISOString(),
        };

        console.log('Final Application Data:', applicationData);
        
        Swal.fire({
            title: 'Confirm Application?',
            text: `You are applying for the ${data.loanTitle} with amount ${data.loanAmount}. Confirm your details?`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes, Apply Now!',
            cancelButtonText: 'Review',
        }).then((result) => {
            if (result.isConfirmed) {
                // এখানে আপনার ডেটাবেসে POST রিকোয়েস্ট যাবে (যেমন: /applications)
                axiosSecure.post('/applications', applicationData)
                    .then(res => {
                        console.log('Application saved:', res.data);
                        Swal.fire(
                            'Application Sent!',
                            'Your loan application has been successfully submitted and is under review.',
                            'success'
                        );
                        reset(); // সফল সাবমিশনের পর ফর্ম রিসেট
                    })
                    .catch(err => {
                        console.error('Submission Error:', err);
                        Swal.fire(
                            'Error!',
                            'There was an issue submitting your application. Please try again.',
                            'error'
                        );
                    });
            }
        });
    };

    // Tailwind স্টাইল ক্লাস
    const inputClass = "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150 text-gray-700";
    const readOnlyClass = "mt-1 block w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg shadow-inner text-gray-600 font-medium";
    const errorClass = "text-red-600 text-sm mt-1 font-medium";
    const labelClass = "block text-base font-semibold text-gray-800 mb-1";

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-3xl rounded-xl my-10 border-t-8 border-green-600">
            
            <h2 className="text-4xl font-extrabold text-center text-green-700 mb-2">Loan Application Form 🚀</h2>
            <p className="text-center text-gray-500 mb-10 text-lg">Please fill out the form below to apply for a microloan.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* ⚠️ Auto-filled (Read-Only) Details Section ⚠️ */}
                <h3 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4">Loan Details (Auto-filled)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* User Email (Read Only) */}
                    <div>
                        <label className={labelClass}>User Email:</label>
                        <input type="email" readOnly {...register("userEmail")} className={readOnlyClass} />
                    </div>
                    {/* Loan Title (Read Only) */}
                    <div>
                        <label className={labelClass}>Loan Title:</label>
                        <input type="text" readOnly {...register("loanTitle")} className={readOnlyClass} />
                    </div>
                    {/* Interest Rate (Read Only) */}
                    <div>
                        <label className={labelClass}>Interest Rate:</label>
                        <input type="text" readOnly {...register("interestRate")} className={readOnlyClass} />
                    </div>
                </div>
                
                {/* --- */}

                {/* User Input Section */}
                <h3 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4">Applicant Information</h3>
                
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>First Name:</label>
                        <input type="text" {...register("firstName", { required: true })} placeholder="First Name" className={inputClass} />
                        {errors.firstName && <p className={errorClass}>First Name is required</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Last Name:</label>
                        <input type="text" {...register("lastName", { required: true })} placeholder="Last Name" className={inputClass} />
                        {errors.lastName && <p className={errorClass}>Last Name is required</p>}
                    </div>
                </div>
                
                {/* Contact Number and National ID/Passport Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Contact Number:</label>
                        <input type="tel" {...register("contactNumber", { required: true, pattern: /^[0-9+]+$/ })} placeholder="e.g., +8801XXXXXXXXX" className={inputClass} />
                        {errors.contactNumber && <p className={errorClass}>Valid Contact Number is required</p>}
                    </div>

                    <div>
                        <label className={labelClass}>National ID / Passport Number:</label>
                        <input type="text" {...register("idNumber", { required: true })} placeholder="NID/Passport Number" className={inputClass} />
                        {errors.idNumber && <p className={errorClass}>ID/Passport Number is required</p>}
                    </div>
                </div>

                {/* Income Source and Monthly Income */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Income Source:</label>
                        <select {...register("incomeSource", { required: true })} className={inputClass}>
                            <option value="">Select Income Source</option>
                            <option value="Salary">Salaried</option>
                            <option value="Business">Business Owner</option>
                            <option value="Freelance">Freelance/Self-Employed</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.incomeSource && <p className={errorClass}>Income Source is required</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Monthly Income (BDT):</label>
                        <input type="number" {...register("monthlyIncome", { required: true, min: 5000 })} placeholder="e.g., 25000" className={inputClass} />
                        {errors.monthlyIncome && <p className={errorClass}>Valid Monthly Income is required</p>}
                    </div>
                </div>

                {/* --- */}

                {/* Loan Amount and Reason for Loan */}
                <h3 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4 mt-10">Application Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Loan Amount (BDT):</label>
                        <input 
                            type="number" 
                            {...register("loanAmount", { 
                                required: true, 
                                min: { value: 10000, message: "Minimum loan amount is 10,000 BDT" } 
                            })} 
                            placeholder="Minimum 10,000 BDT" 
                            className={inputClass} 
                        />
                        {errors.loanAmount && <p className={errorClass}>{errors.loanAmount.message || "Loan Amount is required"}</p>}
                    </div>
                    
                    <div>
                        <label className={labelClass}>Desired Repayment Period (Months):</label>
                        <select {...register("repaymentPeriod", { required: true })} className={inputClass}>
                            <option value="">Select Period</option>
                            <option value="6">6 Months</option>
                            <option value="12">12 Months</option>
                            <option value="18">18 Months</option>
                            <option value="24">24 Months</option>
                        </select>
                        {errors.repaymentPeriod && <p className={errorClass}>Repayment Period is required</p>}
                    </div>
                </div>
                
                {/* Reason for Loan and Address */}
                <div>
                    <label className={labelClass}>Reason for Loan:</label>
                    <textarea 
                        {...register("reasonForLoan", { required: true, minLength: 20 })} 
                        rows="4" 
                        placeholder="Briefly describe how you plan to use the loan (e.g., expanding farm, buying materials)." 
                        className={inputClass}
                    ></textarea>
                    {errors.reasonForLoan && <p className={errorClass}>Reason is required and must be at least 20 characters</p>}
                </div>
                
                <div>
                    <label className={labelClass}>Address:</label>
                    <input type="text" {...register("address", { required: true })} placeholder="Street Address, City, District" className={inputClass} />
                    {errors.address && <p className={errorClass}>Address is required</p>}
                </div>

                {/* Extra Notes */}
                <div>
                    <label className={labelClass}>Extra Notes (Optional):</label>
                    <textarea 
                        {...register("extraNotes")} 
                        rows="3" 
                        placeholder="Any additional information or documents you want to mention." 
                        className={inputClass}
                    ></textarea>
                </div>

                {/* Submission Button */}
                <button 
                    type="submit" 
                    className="w-full py-3 px-4 rounded-lg shadow-xl text-xl font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 transform hover:scale-[1.01]"
                >
                    Submit Loan Application
                </button>
            </form>
        </div>
    );
};

export default LoanApplicationForm;