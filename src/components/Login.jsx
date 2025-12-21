import React from 'react';

import { useForm } from 'react-hook-form'; 

import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const GoogleIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="h-5 w-5 mr-2"
    >
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.343c-1.292,3.719-4.582,6.448-8.343,6.448c-5.14,0-9.344-4.204-9.344-9.344s4.204-9.344,9.344-9.344c3.109,0,5.772,1.8,7.054,4.364l4.15-2.651C37.199,10.038,31.474,7,24,7C12.433,7,2.9,16.533,2.9,28S12.433,49,24,49c12.51,0,22.091-10.016,22.091-22C46.091,25.753,45.698,22.92,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.262,28c0-2.822,0.597-5.501,1.655-8.019L10.37,20.276C9.073,22.46,8.423,25.132,8.423,28s0.65,5.54,1.947,7.724l-2.453,1.954C6.859,33.501,6.262,30.822,6.262,28z"/>
        <path fill="#4CAF50" d="M24,45c6.516,0,12.339-3.415,15.342-8.525l-4.15-2.651C33.15,35.348,29.172,37.5,24,37.5c-4.908,0-9.03-2.9-10.9-7.051l-4.114,3.018C11.196,41.972,17.189,45,24,45z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.343c-0.28,1.444-1.127,2.775-2.449,3.872c-0.08,0.065-0.163,0.126-0.247,0.186l4.15,2.651C38.077,32.74,42.023,27.14,43.611,20.083z"/>
    </svg>
);


const GitHubIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        className="h-5 w-5 mr-2"
    >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.741.082-.725.082-.725 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.793 1.305 3.476.998.108-.77.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.923.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.56 21.79 24 17.302 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
);


const Login = () => {

    const { register, handleSubmit } = useForm();

   const { signInUser } = useAuth();
    const navigate = useNavigate();

const handleLogin = (data) => {
  signInUser(data.email, data.password)
    .then(result => {
      console.log(result.user);
      toast.success("Login Successful!");
       navigate('/');
    })
    .catch(error => {
      console.log(error.code);

      // ⭐ Custom Error Handling
      if (error.code === "auth/user-not-found") {
        toast.error(" Email does not exist!");
      }
      else if (error.code === "auth/wrong-password") {
        toast.error(" Wrong Password! Try again.");
      }
      else if (error.code === "auth/invalid-email") {
        toast.error(" Invalid email format!");
      }
      else {
        toast.error("Login failed! Try again.");
      }
    });
};


    const {  signInGoogle} = useAuth();
    const handleSingIn = () => {
  signInGoogle()
  .then(result =>{
    console.log(result.user)
  })
  .catch(error =>{
    console.log(error)
  })
    }

    return (
        <div className="hero bg-base-300 min-h-screen"> 

            <form onSubmit={handleSubmit(handleLogin)} className="w-full">
                <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-5xl">


                    <div className="text-center lg:text-left lg:w-1/2 p-6">
                        <h1 className="text-5xl font-extrabold text-primary mb-4">Welcome Back!</h1>
                        <p className="py-6 text-lg">
                            Access your loan details, track applications, and manage your financial profile quickly and securely.
                        </p>
                    </div>


                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl lg:w-1/2">
                        <div className="card-body">

                            <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="Enter Your Email" 
                                    className="input input-bordered" 
                                    {...register('email')}
                                    required
                                />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="input input-bordered" 
                                    {...register('password')}
                                    required
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-4">

                                <button className="btn btn-primary">Login</button>
                            </div>
                            

                            <div className="divider text-sm my-4">OR CONTINUE WITH</div>

                            <div className="flex flex-col gap-3">

                                <button
                                onClick={handleSingIn} className="btn btn-outline btn-info" type="button">
                                    <GoogleIcon />
                                    Login with Google
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

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;