// src/page/Home/Contact/Contact.jsx
import React, { useState } from "react";
import Loading from "../../../components/Loading";

// Reusable class constant for consistent input styling
const INPUT_CLASS =
  "w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out placeholder-gray-500";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request (Replace with your actual API call)
    setTimeout(() => {
      setLoading(false);
      alert("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Get In Touch
          </h2>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2">
            Contact Our Team
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            LoanLink is a web-based microloan management system. Send us your query 
            or feedback using the form below, and we will get back to you promptly.
          </p>
        </div>

        {/* Contact Content Area */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Contact Information (Left Column) */}
          <div className="lg:col-span-1 bg-blue-600 p-8 rounded-xl lg:rounded-none lg:rounded-l-2xl text-white flex flex-col justify-between">
            <div>
                <h3 className="text-2xl font-bold mb-4">Our Information</h3>
                <p className="mb-8 text-blue-100">
                    Feel free to reach out to us directly with any questions about 
                    our services or for technical support.
                </p>
                <div className="space-y-6">
                    {/* Location */}
                    <div className="flex items-start">
                        <svg className="flex-shrink-0 h-6 w-6 text-blue-300 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <div>
                            <p className="font-semibold">Office Address</p>
                            <p className="text-sm text-blue-200">122, Main Street, Dhaka, Bangladesh</p>
                        </div>
                    </div>
                    {/* Email */}
                    <div className="flex items-start">
                        <svg className="flex-shrink-0 h-6 w-6 text-blue-300 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 10V8"></path></svg>
                        <div>
                            <p className="font-semibold">Email Us</p>
                            <a href="mailto:support@loanlink.com" className="text-sm text-blue-200 hover:text-white transition-colors">support@loanlink.com</a>
                        </div>
                    </div>
                    {/* Phone */}
                    <div className="flex items-start">
                        <svg className="flex-shrink-0 h-6 w-6 text-blue-300 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.293 1.05a11.002 11.002 0 0010.518 10.518l1.05-2.293a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <div>
                            <p className="font-semibold">Call Us</p>
                            <a href="tel:+8801700000000" className="text-sm text-blue-200 hover:text-white transition-colors">+880 17 0000 0000</a>
                        </div>
                    </div>
                </div>
            </div>
            <p className="mt-12 text-xs text-blue-200 opacity-80">
                LoanLink - Simplifying Microloan Management.
            </p>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-2 p-8 md:p-12">
            {loading ? (
              <div className="min-h-96 flex items-center justify-center">
                <Loading />
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    placeholder="How can we help you today?"
                    className={`${INPUT_CLASS} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-[1.01]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;