import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

// Icons
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.343c-1.292,3.719-4.582,6.448-8.343,6.448c-5.14,0-9.344-4.204-9.344-9.344s4.204-9.344,9.344-9.344c3.109,0,5.772,1.8,7.054,4.364l4.15-2.651C37.199,10.038,31.474,7,24,7C12.433,7,2.9,16.533,2.9,28S12.433,49,24,49c12.51,0,22.091-10.016,22.091-22C46.091,25.753,45.698,22.92,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.262,28c0-2.822,0.597-5.501,1.655-8.019L10.37,20.276C9.073,22.46,8.423,25.132,8.423,28s0.65,5.54,1.947,7.724l-2.453,1.954C6.859,33.501,6.262,30.822,6.262,28z"/>
        <path fill="#4CAF50" d="M24,45c6.516,0,12.339-3.415,15.342-8.525l-4.15-2.651C33.15,35.348,29.172,37.5,24,37.5c-4.908,0-9.03-2.9-10.9-7.051l-4.114,3.018C11.196,41.972,17.189,45,24,45z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.343c-0.28,1.444-1.127,2.775-2.449,3.872c-0.08,0.065-0.163,0.126-0.247,0.186l4.15,2.651C38.077,32.74,42.023,27.14,43.611,20.083z"/>
    </svg>
);

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
);

const EyeIcon = ({ show }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {show ? (
            <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </>
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        )}
    </svg>
);

const Login = () => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const { signInUser, signInGoogle, signInFacebook } = useAuth();
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDemoOptions, setShowDemoOptions] = useState(false);

    const handleLogin = async (data) => {
        const { email, password } = data;
        
        setIsSubmitting(true);
        
        try {
            await signInUser(email, password, rememberMe);
            toast.success("Login Successful!");
            navigate('/');
            
        } catch (error) {
            console.error(error.code);
            
            if (error.code === "auth/user-not-found") {
                toast.error("Email does not exist!");
            }
            else if (error.code === "auth/wrong-password") {
                toast.error("Wrong Password! Try again.");
            }
            else if (error.code === "auth/invalid-email") {
                toast.error("Invalid email format!");
            }
            else if (error.code === "auth/too-many-requests") {
                toast.error("Too many attempts. Try again later!");
            }
            else if (error.code === "auth/user-disabled") {
                toast.error("Account has been disabled!");
            }
            else {
                toast.error("Login failed! Try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = () => {
        signInGoogle()
        .then(result => {
            console.log(result.user);
            toast.success("Google Login Successful!");
            navigate('/');
        })
        .catch(error => {
            console.log(error);
            toast.error("Google Login failed!");
        });
    };

    const handleFacebookSignIn = () => {
        signInFacebook()
        .then(result => {
            console.log(result.user);
            toast.success("Facebook Login Successful!");
            navigate('/');
        })
        .catch(error => {
            console.log(error);
            toast.error("Facebook Login failed!");
        });
    };

    // Demo Login Functions
    const handleDemoManagerLogin = () => {
        const managerCredentials = {
            email: "manager@loanmate.com",
            password: "7890Av!@#?4"
        };
        
        setValue('email', managerCredentials.email);
        setValue('password', managerCredentials.password);
        
        toast.loading("Logging in as Manager...", { duration: 2000 });
        
        setTimeout(() => {
            document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }, 500);
    };

    const handleDemoAdminLogin = () => {
        const adminCredentials = {
            email: "admin@loanmate.com",
            password: "7890Av!@#?5"
        };
        
        setValue('email', adminCredentials.email);
        setValue('password', adminCredentials.password);
        
        toast.loading("Logging in as Admin...", { duration: 2000 });
        
        setTimeout(() => {
            document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }, 500);
    };

    const handleDemoBorrowerLogin = () => {
        const borrowerCredentials = {
            email: "ikram@gmail.com",  // ✅ ikram@gmail.com
            password: "7890Av!@#?"     // ✅ 7890Av!@#?
        };
        
        setValue('email', borrowerCredentials.email);
        setValue('password', borrowerCredentials.password);
        
        toast.loading("Logging in as Borrower...", { duration: 2000 });
        
        setTimeout(() => {
            document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }, 500);
    };

    const handleClearForm = () => {
        reset();
        toast.success("Form cleared!");
    };

    return (
        <div className="hero bg-base-300 min-h-screen"> 
            <form onSubmit={handleSubmit(handleLogin)} className="w-full">
                <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-5xl">

                    {/* Left Side - Welcome Text */}
                    <div className="text-center lg:text-left lg:w-1/2 p-6">
                        <h1 className="text-5xl font-extrabold text-primary mb-4">Welcome Back!</h1>
                        <p className="py-6 text-lg">
                            Access your loan details, track applications, and manage your financial profile quickly and securely.
                        </p>
                        
                        {/* Demo Info Card */}
                        <div className="mt-8 bg-base-100 p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">🚀 Quick Demo Login</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="badge badge-primary">Admin</div>
                                    <span className="text-sm">Full system access</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="badge badge-secondary">Manager</div>
                                    <span className="text-sm">Loan management</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="badge badge-accent">Borrower</div>
                                    <span className="text-sm">Apply for loans</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowDemoOptions(!showDemoOptions)}
                                className="btn btn-outline btn-sm mt-4 w-full"
                            >
                                {showDemoOptions ? "Hide Demo Options" : "Show Demo Logins"}
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl lg:w-1/2">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

                            {/* Email Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="Enter Your Email" 
                                    className="input input-bordered" 
                                    {...register('email', { required: true })}
                                    required
                                />
                            </div>

                            {/* Password Input with show/hide */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        className="input input-bordered w-full pr-12" 
                                        {...register('password', { required: true })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <EyeIcon show={showPassword} />
                                    </button>
                                </div>
                                <label className="label">
                                    <a href="/forgot-password" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            {/* Remember Me Checkbox */}
                            <div className="form-control mt-2">
                                <label className="label cursor-pointer justify-start gap-3">
                                    <input 
                                        type="checkbox" 
                                        className="checkbox checkbox-primary" 
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <span className="label-text">Remember me</span>
                                </label>
                            </div>

                            {/* Demo Login Buttons (Conditional) */}
                            {showDemoOptions && (
                                <div className="mt-4 space-y-3">
                                    <div className="text-center mb-2">
                                        <span className="text-sm font-semibold text-primary">Demo Accounts</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleDemoAdminLogin}
                                        className="btn btn-primary w-full gap-2"
                                    >
                                        Login as Admin
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDemoManagerLogin}
                                        className="btn btn-secondary w-full gap-2"
                                    >
                                        Login as Manager
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDemoBorrowerLogin}
                                        className="btn btn-accent w-full gap-2"
                                    >
                                        Login as Borrower
                                    </button>
                                    <div className="divider text-xs">OR</div>
                                </div>
                            )}

                            {/* Regular Login Button */}
                            <div className="form-control mt-4">
                                <button 
                                    className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>
                            </div>

                            {/* Clear Form Button */}
                            <div className="form-control mt-2">
                                <button 
                                    type="button" 
                                    onClick={handleClearForm}
                                    className="btn btn-outline btn-sm"
                                >
                                    Clear Form
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="divider text-sm my-4">OR CONTINUE WITH</div>

                            {/* Social Login Buttons */}
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleGoogleSignIn} 
                                    className="btn btn-outline btn-info gap-2"
                                    type="button"
                                >
                                    <GoogleIcon />
                                    Login with Google
                                </button>
                                <button
                                    onClick={handleFacebookSignIn}
                                    className="btn btn-outline btn-primary gap-2"
                                    type="button"
                                >
                                    <FacebookIcon />
                                    Login with Facebook
                                </button>
                            </div>

                            {/* Register Link */}
                            <div className="text-center mt-6">
                                <p className="text-sm">
                                    Don't have an account? 
                                    <Link to="/register" className="link link-hover link-primary ml-1 font-bold">
                                        Register here
                                    </Link>
                                </p>
                            </div>

                            {/* Demo Credentials Info */}
                            <div className="mt-6 p-4 bg-base-200 rounded-lg">
                                <h4 className="font-bold text-sm mb-2">📋 Demo Credentials:</h4>
                                <div className="space-y-2 text-xs">
                                    <div>
                                        <span className="font-semibold">Admin:</span> 
                                        <code className="ml-2 bg-base-300 px-2 py-1 rounded">admin@loanmate.com</code>
                                        <br/>
                                        <span className="font-semibold">Pass:</span> 
                                        <code className="ml-2 bg-base-300 px-2 py-1 rounded">7890Av!@#?5</code>
                                    </div>
                                    <div className="mt-2">
                                        <span className="font-semibold">Manager:</span> 
                                        <code className="ml-2 bg-base-300 px-2 py-1 rounded">manager@loanmate.com</code>
                                        <br/>
                                        <span className="font-semibold">Pass:</span> 
                                        <code className="ml-2 bg-base-300 px-2 py-1 rounded">7890Av!@#?4</code>
                                    </div>
                                    <div className="mt-2">
                                        <span className="font-semibold">Borrower:</span> 
                                        <code className="ml-2 bg-base-300 px-2 py-1 rounded">ikram@gmail.com</code>
                                        <br/>
                                        <span className="font-semibold">Pass:</span> 
                                        <code className="ml-2 bg-base-300 px-2 py-1 rounded">7890Av!@#?</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;