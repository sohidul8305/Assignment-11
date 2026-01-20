import React from "react";
import { 

  FaInstagram, 
  FaLinkedin, 
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LoanLogo from "../assets/Loanlogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <img src={LoanLogo} alt="LoanHub" className="h-10 w-auto" />
                <div>
                  <h2 className="text-xl font-bold text-primary">LoanHub</h2>
                  <p className="text-xs opacity-70">Smart Financing</p>
                </div>
              </div>
            </Link>
            
            <p className="text-sm mb-4 opacity-80">
              Your trusted partner for transparent and fast loan services.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-primary text-sm" />
                <span className="opacity-80">+880 1944709984</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-primary text-sm" />
                <span className="opacity-80">support@loanhub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-primary text-sm" />
                <span className="opacity-80">Sun-Thu: 9AM-6PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/all-loans" className="hover:text-primary transition-colors text-sm">
                  All Loans
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-primary transition-colors text-sm">
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="" className="hover:text-primary transition-colors text-sm">
                  Personal Loans
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-primary transition-colors text-sm">
                  Business Loans
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-primary transition-colors text-sm">
                  Home Loans
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-primary transition-colors text-sm">
                  Education Loans
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-primary transition-colors text-sm">
                  Car Loans
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Legal</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to="" className="hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-primary transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>

            {/* Social Media */}
            <div>
              <h3 className="font-bold mb-3 text-lg">Follow Us</h3>
              <div className="flex gap-3">

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 pt-6 border-t border-base-content/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold mb-2">Stay Updated</h3>
              <p className="text-sm opacity-80">Get latest loan tips & offers</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 sm:w-64 px-4 py-2 bg-base-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button className="btn btn-primary btn-sm rounded-lg px-4">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-base-content/5 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm opacity-80">
                © {currentYear} LoanHub. All rights reserved.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <FaShieldAlt className="text-green-500 text-xs" />
                <span className="text-xs opacity-60">256-bit SSL Secured</span>
              </div>
            </div>

            {/* Address */}
            <div className="text-center md:text-right">
              <div className="flex items-center gap-2 text-sm opacity-80 justify-center md:justify-end">
                <FaMapMarkerAlt className="text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <p className="text-xs opacity-60 mt-1">
                Registered with Bangladesh Bank
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top - Smaller */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 w-10 h-10 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 z-40 flex items-center justify-center"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;