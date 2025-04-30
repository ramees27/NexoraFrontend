import React from 'react'
import {FaFacebookF,FaLinkedinIn,FaYoutube,} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-[#F9F6F6] text-[#2F2F2F] py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div>
          <h2 className="text-2xl font-extrabold text-[#2A2D8F]">NEXORA</h2>
          <p className="mt-2 text-sm text-[#4B4F58]">
            Connect with professional career counselors to guide your future path.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">For Students</h3>
          <ul className="space-y-2 text-sm text-[#2F2F2F]">
            <li><a href="#" className="hover:underline">Find a Counselor</a></li>
            <li><a href="#" className="hover:underline">Book a Session</a></li>
            <li><a href="#" className="hover:underline">Career Resources</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">For Counselors</h3>
          <ul className="space-y-2 text-sm text-[#2F2F2F]">
            <li><a href="#" className="hover:underline">Join as Counselor</a></li>
            <li><a href="#" className="hover:underline">Manage Sessions</a></li>
            <li><a href="#" className="hover:underline">Payment Info</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-[#2F2F2F]">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 text-center text-sm text-[#4B4F58]">
        <p>&copy; 2025 Nexora. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-4 text-xl">
          <a href="#"><FaXTwitter className="hover:text-[#2A2D8F]" /></a>
          <a href="#"><FaFacebookF className="hover:text-[#2A2D8F]" /></a>
          <a href="#"><FaLinkedinIn className="hover:text-[#2A2D8F]" /></a>
          <a href="#"><FaYoutube className="hover:text-[#2A2D8F]" /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer