import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from "react-hot-toast";

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const handleRegistration = async (data) => {
        const { name, email, password, photo } = data;

        // Password Validation
        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least 1 uppercase letter!");
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least 1 lowercase letter!");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long!");
            return;
        }

        try {
            // Create user in Firebase
            const result = await registerUser(email, password);
            console.log(result.user);

            // Update profile (Name + Photo)
            await updateUserProfile({
                displayName: name,
                photoURL: photo
                    ? photo
                    : "https://i.ibb.co.com/FHzqKJv/default-profile.png" // default photo
            });

            toast.success("Registration Successful!");
            navigate('/');

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="hero bg-base-300 min-h-screen">
            <form onSubmit={handleSubmit(handleRegistration)} className="w-full">
                <div className="hero-content flex-col lg:flex-row w-full max-w-5xl">

                    {/* Left Content */}
                    <div className="text-center lg:text-left lg:w-1/2 p-6">
                        <h1 className="text-5xl font-extrabold text-primary mb-4">Join Our Platform!</h1>
                        <p className="py-6 text-lg">
                            Create an account to access loans, manage your profile, and connect with managers or borrowers.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl lg:w-1/2">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-center mb-6">Register Account</h1>

                            {/* Name */}
                            <div className="form-control">
                                <label className="label"><span className="label-text">Name</span></label>
                                <input
                                    type="text"
                                    placeholder="Your Full Name"
                                    className="input input-bordered"
                                    {...register('name', { required: "Name is required." })}
                                />
                                {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label"><span className="label-text">Email</span></label>
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="input input-bordered"
                                    {...register('email', { required: "Email is required." })}
                                />
                                {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
                            </div>

                            {/* Photo URL */}
                            <div className="form-control">
                                <label className="label"><span className="label-text">Photo URL</span></label>
                                <input
                                    type="text"
                                    placeholder="Photo URL"
                                    className="input input-bordered"
                                    {...register("photo")}
                                />
                            </div>

                            {/* Role */}
                            <div className="form-control">
                                <label className="label"><span className="label-text">Role</span></label>
                                <select
                                    className="select select-bordered w-full"
                                    defaultValue=""
                                    {...register('role', { required: "Role selection is required." })}
                                >
                                    <option value="" disabled>Select your role</option>
                                    <option value="borrower">Borrower</option>
                                    <option value="manager">Manager</option>
                                </select>
                                {errors.role && <p className='text-red-500 text-sm mt-1'>{errors.role.message}</p>}
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label"><span className="label-text">Password</span></label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="input input-bordered"
                                    {...register('password', { required: "Password is required." })}
                                />
                                {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                            </div>

                            {/* Submit */}
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-secondary">Register</button>
                            </div>

                            <div className="text-center mt-6">
                                <p className="text-sm">
                                    Already have an account?
                                    <Link to="/login" className="link link-hover link-primary ml-1 font-bold">Login here</Link>
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
