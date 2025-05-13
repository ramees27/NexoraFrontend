import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CNavBar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const LogOutasCouncelor=()=>{
    toast.success("Logout Succussfully")
    navigate("/")
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Left */}
            <div className="flex-shrink-0">
              <span className="text-3xl font-bold bg-gradient-to-r from-[#1E2A78] to-[#384EDE] bg-clip-text text-transparent">
                NEXO<span>RA</span>
              </span>
            </div>

            {/* Center Nav Links */}
            <div className="hidden md:flex space-x-6 text-base font-medium">
              <button onClick={() => navigate('maintabe')} className="text-blue-600 hover:text-blue-800">Bookings</button>
              <button onClick={() => navigate('/counselor/cpayments')} className="text-blue-600 hover:text-blue-800" >Payments </button>
              <button className="text-blue-600 hover:text-blue-800" onClick={() => navigate('/counselor/creview')}>Review&Rating</button>
            </div>

            {/* Right Side Button */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800"
              >
                 Details
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => navigate("/notifications")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Notifications
                  </button>
                  <button
                    onClick={LogOutasCouncelor}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout as Counselor
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CNavBar;
