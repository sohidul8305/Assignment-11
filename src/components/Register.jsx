import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from "react-hot-toast";
import axios from "axios";

// Icons
const EyeIcon = ({ show }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    {show ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </>
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    )}
  </svg>
);

const Register = () => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const { registerUser, updateUserProfile, sendVerificationEmail } = useAuth();
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const handleRegistration = async (data) => {
        const { name, email, password, photo, role } = data;
        const profileImg = photo[0];

        // Password validation
        if (!/[A-Z]/.test(password)) {
            return toast.error("Add at least 1 uppercase letter!");
        }
        if (!/[a-z]/.test(password)) {
            return toast.error("Add at least 1 lowercase letter!");
        }
        if (!/[0-9]/.test(password)) {
            return toast.error("Add at least 1 number!");
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return toast.error("Add at least 1 special character!");
        }
        if (password.length < 8) {
            return toast.error("Password must be at least 8 characters!");
        }
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        setIsSubmitting(true);

        try {
            // Create user
            const result = await registerUser(email, password);

            // Upload image to imgbb
            let uploadedPhotoURL = "";
            if (profileImg) {
                const formData = new FormData();
                formData.append("image", profileImg);

                const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
                const uploadRes = await axios.post(url, formData);
                uploadedPhotoURL = uploadRes.data.data.url;
            }

            // Update Firebase profile
            await updateUserProfile({
                displayName: name,
                photoURL: uploadedPhotoURL || "https://i.ibb.co.com/7JZzH2B/default-avatar.png"
            });

            // Send verification email
            await sendVerificationEmail();

            // Save additional user data to your database if needed
            const userData = {
                uid: result.user.uid,
                name,
                email,
                role: role || 'borrower',
                photoURL: uploadedPhotoURL,
                emailVerified: false,
                createdAt: new Date().toISOString()
            };

            // Save to your backend
            await axios.post('https://loanmate-nine.vercel.app/users', userData);

            toast.success("Registration Successful! Please check your email for verification.");
            
            // Redirect to verification page
            navigate('/verify-email');

        } catch (error) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email already registered!");
            } else if (error.code === 'auth/invalid-email') {
                toast.error("Invalid email format!");
            } else if (error.code === 'auth/weak-password') {
                toast.error("Password is too weak!");
            } else {
                toast.error(error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Demo Fill Functions
    const fillDemoManager = () => {
        setValue('name', 'Demo Manager');
        setValue('email', 'manager@loanmate.com');
        setValue('role', 'manager');
        setValue('password', '7890Av!@#?4');
        setValue('confirmPassword', '7890Av!@#?4');
        toast.success("Manager demo fields filled!");
    };

    const fillDemoAdmin = () => {
        setValue('name', 'Demo Admin');
        setValue('email', 'admin@loanmate.com');
        setValue('role', 'admin');
        setValue('password', '7890Av!@#?5');
        setValue('confirmPassword', '7890Av!@#?5');
        toast.success("Admin demo fields filled!");
    };

    const fillDemoBorrower = () => {
        setValue('name', 'John Doe');
        setValue('email', 'borrower@example.com');
        setValue('role', 'borrower');
        setValue('password', 'Password123!');
        setValue('confirmPassword', 'Password123!');
        toast.success("Borrower demo fields filled!");
    };

    return (
        <div className="hero bg-base-300 min-h-screen">
            <form onSubmit={handleSubmit(handleRegistration)} className="w-full">
                <div className="hero-content flex-col lg:flex-row w-full max-w-5xl">

                    {/* Left Side */}
                    <div className="text-center lg:text-left lg:w-1/2 p-6">
                        <h1 className="text-5xl font-extrabold text-primary mb-4">Join Our Platform!</h1>
                        <p className="py-6 text-lg">
                            Create an account to access loans and manage your profile easily.
                        </p>
                        
                        {/* Password Requirements */}
                        <div className="mt-8 bg-base-100 p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">🔒 Password Requirements</h3>
                            <ul className="space-y-2 text-sm">
                                <li className={`flex items-center ${password?.length >= 8 ? 'text-green-500' : 'text-gray-500'}`}>
                                    <span className="mr-2">•</span>
                                    At least 8 characters
                                </li>
                                <li className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-gray-500'}`}>
                                    <span className="mr-2">•</span>
                                    At least 1 uppercase letter
                                </li>
                                <li className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-500' : 'text-gray-500'}`}>
                                    <span className="mr-2">•</span>
                                    At least 1 lowercase letter
                                </li>
                                <li className={`flex items-center ${/[0-9]/.test(password) ? 'text-green-500' : 'text-gray-500'}`}>
                                    <span className="mr-2">•</span>
                                    At least 1 number
                                </li>
                                <li className={`flex items-center ${/[!@#$%^&*]/.test(password) ? 'text-green-500' : 'text-gray-500'}`}>
                                    <span className="mr-2">•</span>
                                    At least 1 special character
                                </li>
                                <li className={`flex items-center ${password === confirmPassword && confirmPassword ? 'text-green-500' : 'text-gray-500'}`}>
                                    <span className="mr-2">•</span>
                                    Passwords match
                                </li>
                            </ul>
                        </div>

                        {/* Demo Fill Buttons */}
                        <div className="mt-8 space-y-3">
                            <h3 className="text-xl font-bold mb-4">🚀 Quick Demo Fill</h3>
                            <button 
                                type="button" 
                                onClick={fillDemoAdmin}
                                className="btn btn-primary w-full gap-2"
                            >
                                Fill Admin Demo
                            </button>
                            <button 
                                type="button" 
                                onClick={fillDemoManager}
                                className="btn btn-secondary w-full gap-2"
                            >
                                Fill Manager Demo
                            </button>
                            <button 
                                type="button" 
                                onClick={fillDemoBorrower}
                                className="btn btn-accent w-full gap-2"
                            >
                                Fill Borrower Demo
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl lg:w-1/2">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-center mb-6">Register Account</h1>

                            {/* Name */}
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Full Name</span></label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your full name"
                                    className="input input-bordered"
                                    {...register('name', { 
                                        required: "Name is required",
                                        minLength: {
                                            value: 3,
                                            message: "Name must be at least 3 characters"
                                        }
                                    })} 
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Email</span></label>
                                <input 
                                    type="email" 
                                    placeholder="example@email.com"
                                    className="input input-bordered"
                                    {...register('email', { 
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })} 
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Photo File */}
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Profile Photo (Optional)</span></label>
                                <input 
                                    type="file" 
                                    className="file-input file-input-bordered w-full"
                                    accept="image/*"
                                    {...register("photo")} 
                                />
                                <label className="label">
                                    <span className="label-text-alt">Max 5MB. Supported: JPG, PNG</span>
                                </label>
                            </div>

                            {/* Role */}
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Role</span></label>
                                <select 
                                    className="select select-bordered w-full"
                                    {...register("role", { required: "Please select a role" })}
                                >
                                    <option value="">Select Role</option>
                                    <option value="borrower">Borrower</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                            </div>

                            {/* Password with show/hide */}
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Password</span></label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Create a strong password"
                                        className="input input-bordered w-full pr-12"
                                        {...register('password', { 
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters"
                                            }
                                        })} 
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <EyeIcon show={showPassword} />
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>

                            {/* Confirm Password with show/hide */}
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Confirm Password</span></label>
                                <div className="relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        placeholder="Re-enter your password"
                                        className="input input-bordered w-full pr-12"
                                        {...register('confirmPassword', { 
                                            required: "Please confirm your password",
                                            validate: value => value === password || "Passwords do not match"
                                        })} 
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <EyeIcon show={showConfirmPassword} />
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                            </div>

                            {/* Terms and Conditions */}
                            <div className="form-control mt-4">
                                <label className="label cursor-pointer justify-start gap-3">
                                    <input 
                                        type="checkbox" 
                                        className="checkbox checkbox-primary" 
                                        {...register('terms', { required: "You must accept the terms and conditions" })}
                                    />
                                    <span className="label-text">
                                        I agree to the <a href="#" className="link link-primary">Terms & Conditions</a> and <a href="#" className="link link-primary">Privacy Policy</a>
                                    </span>
                                </label>
                                {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button 
                                className={`btn btn-secondary mt-6 ${isSubmitting ? 'loading' : ''}`}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                            </button>

                            {/* Login Link */}
                            <p className="text-center mt-6">
                                Already have an account?
                                <Link to="/login" className="link ml-1 font-semibold">Login here</Link>
                            </p>

                            {/* Verification Info */}
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-bold text-sm mb-2 text-blue-800">📧 Email Verification</h4>
                                <p className="text-xs text-blue-700">
                                    After registration, you'll receive a verification email. Please verify your email to access all features.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;