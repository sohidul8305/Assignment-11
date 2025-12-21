import React from "react";
import { useNavigate } from "react-router-dom";

// Image import (Vite supports direct import)
import heroImage from "../../assets/loan2.jpg";
import { Link } from "react-router";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (

    <section className="relative w-full h-[80vh] md:h-[90vh] lg:h-screen">
      {/* Hero Image */}
      <img
        src={heroImage}
        alt="Loan Hero"
        className="w-full h-full object-cover "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 mt-20 flex flex-col justify-center items-center text-center p-4 space-y-6">
        <h1 className="text-4xl md:text-6xl mt-5 lg:text-5xl font-extrabold text-white drop-shadow-lg">
          EMPOWER YOUR FUTURE
        </h1>
        <p className="text-lg md:text-2xl text-white max-w-3xl drop-shadow-md">
          Invest in Your Dreams, Today. Unlock your potential with our accessible
          community loans. Flexible terms, low interest, and a path to success.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
      <Link to="loan-applications">
            <button
            onClick={() => navigate("/loan-application-form")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            APPLY FOR LOAN
          </button>
      </Link>

          <button
            onClick={() => navigate("/all-loans")}
            className="bg-transparent hover:bg-white/20 border border-white text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            EXPLORE LOANS
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
