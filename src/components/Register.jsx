import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const handleRegistration = async (data) => {
        const { name, email, password, photo } = data;
        const profileImg = photo[0];

        // Password validation
        if (!/[A-Z]/.test(password)) return toast.error("Add at least 1 uppercase letter!");
        if (!/[a-z]/.test(password)) return toast.error("Add at least 1 lowercase letter!");
        if (password.length < 6) return toast.error("Password must be at least 6 characters!");

        try {
            // Create user
            const result = await registerUser(email, password);

            // Upload image to imgbb
            const formData = new FormData();
            formData.append("image", profileImg);

            const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

            const uploadRes = await axios.post(url, formData);
            const uploadedPhotoURL = uploadRes.data.data.url;

            // Update Firebase profile
            await updateUserProfile({
                displayName: name,
                photoURL: uploadedPhotoURL
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

                    {/* Left */}
                    <div className="text-center lg:text-left lg:w-1/2 p-6">
                        <h1 className="text-5xl font-extrabold text-primary mb-4">Join Our Platform!</h1>
                        <p className="py-6 text-lg">
                            Create an account to access loans and manage your profile easily.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl lg:w-1/2">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-center mb-6">Register Account</h1>

                            {/* Name */}
                            <div className="form-control">
                                <label className="label"><span>Name</span></label>
                                <input type="text" className="input input-bordered"
                                    {...register('name', { required: "Name is required" })} />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label"><span>Email</span></label>
                                <input type="email" className="input input-bordered"
                                    {...register('email', { required: "Email is required" })} />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>

                            {/* Photo File */}
                            <div className="form-control">
                                <label className="label"><span>Photo</span></label>
                                <input type="file" className="file-input"
                                    {...register("photo", { required: true })} />
                            </div>

                            {/* Role */}
                            <div className="form-control">
                                <label className="label"><span>Role</span></label>
                                <select className="select select-bordered"
                                    {...register("role", { required: "Role is required" })}>
                                    <option value="">Select Role</option>
                                    <option value="borrower">Borrower</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label"><span>Password</span></label>
                                <input type="password" className="input input-bordered"
                                    {...register('password', { required: "Password is required" })} />
                            </div>

                            <button className="btn btn-secondary mt-6">Register</button>

                            <p className="text-center mt-6">
                                Already have an account?
                                <Link to="/login" className="link ml-1">Login</Link>
                            </p>

                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default Register;
