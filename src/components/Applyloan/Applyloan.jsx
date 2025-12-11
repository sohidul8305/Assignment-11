import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";
import axiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const LoanApplicationForm = () => {
    const location = useLocation();
    const { loanInfo, user: stateUser } = location.state || {};
    const { user: authUser } = useAuth();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            userEmail: stateUser?.email || authUser?.email || "",
            loanTitle: loanInfo?.title || "",
            interestRate: loanInfo?.interest || "",
        }
    });

    const onSubmit = (data) => {
        const applicationData = {
            ...data,
            status: 'Pending',
            feeStatus: 'unpaid',
            applicationDate: new Date().toISOString()
        };

        Swal.fire({
            title: 'Confirm Application?',
            text: `You are applying for ${data.loanTitle || "this loan"} with amount ${data.loanAmount}. Confirm your details?`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes, Apply Now!',
            cancelButtonText: 'Review',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/loan-applications', applicationData)
                    .then(res => {
                        Swal.fire('Success!', 'Your loan application is submitted.', 'success');
                        reset();
                    })
                    .catch(err => {
                        Swal.fire('Error!', 'Could not submit your application.', 'error');
                    });
            }
        });
    };

    const inputClass = "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-700";
    const readOnlyClass = "mt-1 block w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-600 font-medium";
    const labelClass = "block text-base font-semibold text-gray-800 mb-1";
    const errorClass = "text-red-600 text-sm mt-1 font-medium";

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-3xl rounded-xl my-10 border-t-8 border-green-600">
            <h2 className="text-4xl font-extrabold text-center text-green-700 mb-2">Loan Application Form 🚀</h2>
            <p className="text-center text-gray-500 mb-10 text-lg">Please fill out the form below to apply for a loan.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Loan Details */}
                <h3 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4">Loan Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className={labelClass}>User Email:</label>
                        <input
                            type="email"
                            {...register("userEmail")}
                            defaultValue={stateUser?.email || authUser?.email || ""}
                            className={readOnlyClass}
                            readOnly={!!(stateUser?.email || authUser?.email)}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Loan Title:</label>
                        <input
                            type="text"
                            {...register("loanTitle")}
                            defaultValue={loanInfo?.title || ""}
                            className={readOnlyClass}
                            readOnly={!!loanInfo?.title}
                            placeholder="Enter loan title"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Interest Rate:</label>
                        <input
                            type="text"
                            {...register("interestRate")}
                            defaultValue={loanInfo?.interest || ""}
                            className={readOnlyClass}
                            readOnly={!!loanInfo?.interest}
                            placeholder="Enter interest rate"
                        />
                    </div>
                </div>

                {/* Applicant Information */}
                <h3 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4">Applicant Information</h3>
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

                {/* Loan Application Details */}
                <h3 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4 mt-10">Application Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Loan Amount (BDT):</label>
                        <input type="number" {...register("loanAmount", { required: true, min: { value: 10, message: "Minimum loan amount is 10 BDT" } })} placeholder="Minimum 10 BDT" className={inputClass} />
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

                <div>
                    <label className={labelClass}>Reason for Loan:</label>
                    <textarea {...register("reasonForLoan", { required: true, minLength: 15 })} rows="4" placeholder="Briefly describe how you plan to use the loan." className={inputClass}></textarea>
                    {errors.reasonForLoan && <p className={errorClass}>Reason is required and must be at least 15 characters</p>}
                </div>

                <div>
                    <label className={labelClass}>Address:</label>
                    <input type="text" {...register("address", { required: true })} placeholder="Street Address, City, District" className={inputClass} />
                    {errors.address && <p className={errorClass}>Address is required</p>}
                </div>

                <div>
                    <label className={labelClass}>Extra Notes (Optional):</label>
                    <textarea {...register("extraNotes")} rows="3" placeholder="Any additional information or documents you want to mention." className={inputClass}></textarea>
                </div>

                <button type="submit" className="w-full py-3 px-4 rounded-lg shadow-xl text-xl font-bold text-white bg-green-600 hover:bg-green-700">
                    Submit Loan Application
                </button>
            </form>
        </div>
    );
};

export default LoanApplicationForm;
