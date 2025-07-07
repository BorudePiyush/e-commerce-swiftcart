import React from 'react';
import logo from '../assets/logof.png';

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#e6fff5] to-[#cbf6ff] text-[#1a1a1a] font-sans mt-10">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto py-10 px-6 gap-10 md:gap-0">
        
        {/* Brand Info */}
        <div className="md:w-1/3 w-full">
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} alt="SwiftCart Logo" className="w-10 h-10" />
            <h2 className="text-xl font-semibold">SwiftCart</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            SwiftCart is a modern, responsive e-commerce platform built for speed, simplicity, and style. Enjoy seamless shopping at your fingertips.
          </p>
        </div>

        {/* Links */}
        <div className="md:w-1/4 w-full">
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Delivery</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:w-1/4 w-full">
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <ul className="space-y-2 text-sm">
            <li>📞 +91-9307342318</li>
            <li>📧 contact@swiftcart.com</li>
            <li>📞 +1-123-456-7890</li>
            <li>📧 admin@swiftcart.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 py-3 text-center text-sm bg-[#f5ffff]">
        © 2025 SwiftCart.com | All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
