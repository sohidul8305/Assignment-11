import React from "react";
// Ensure you have react-icons installed: npm install react-icons
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import LoanLogo from "../assets/Loanlogo.png"; // Assuming this path is correct

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content mt-16">
      <div className="container mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo + About */}
          <div>
            <img src={LoanLogo} alt="LoanLink" className="w-24 mb-4" />
            <p className="text-sm leading-relaxed">
              LoanLink is your trusted microloan request & approval management system.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a className="link link-hover" href="/">Home</a></li>
              <li><a className="link link-hover" href="/loans">All Loans</a></li>
              <li><a className="link link-hover" href="/about">About Us</a></li>
              <li><a className="link link-hover" href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a className="link link-hover" href="/terms">Terms of Service</a></li>
              <li><a className="link link-hover" href="/privacy">Privacy Policy</a></li>
              <li><a className="link link-hover" href="/cookies">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Social Icons (FIXED) */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
            <div className="flex gap-4 text-2xl">
              {/* Added target="_blank" to open links in a new tab for external social links */}
              
              {/* Removed src="" from FaFacebook */}
              <a 
                href="https://facebook.com/yourloanlink" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-500 cursor-pointer"
              >
                <FaFacebook />
              </a>
              
              <a 
                href="https://instagram.com/yourloanlink" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-500 cursor-pointer"
              >
                <FaInstagram />
              </a>
              
              <a 
                href="https://twitter.com/yourloanlink" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-sky-500 cursor-pointer"
              >
                <FaTwitter />
              </a>
              
              <a 
                href="https://linkedin.com/company/yourloanlink"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-blue-700 cursor-pointer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t pt-5 text-center text-sm">
          © {currentYear} <span className="font-semibold">LoanLink</span>.  
          All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;