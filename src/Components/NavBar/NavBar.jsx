import React, { useContext, useEffect, useRef, useState } from 'react';
import { UsersContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../api/authapi';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate=useNavigate();
  const { user,setUser } = useContext(UsersContext);
  const dropdownRef = useRef ();

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev )=> !prev);
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside,true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside,true);
    };
  }, []);

  const handleLogout= async ()=>{
    const res=await logOut()
    if(res!=null){
      setUser(false)
      toast.success("Succusfully logout")
    }
    else{
    toast.error("Error in Logout")
    }

  }

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className="bg-white/95 backdrop-blur-sm border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left - Logo */}
            <div className="flex items-center space-x-1">
              <span className="text-3xl font-bold bg-gradient-to-r from-[#1E2A78] to-[#384EDE] bg-clip-text text-transparent">
                NEXO<span>RA</span>
              </span>
            </div>

            {/* Center Menu - Hidden on Mobile */}
            <div className="hidden md:flex items-center space-x-4">
              <a className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium" onClick={()=>navigate("/")}>Home</a>
              <a  className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium" onClick={()=>navigate("/aboutus")}>About Us</a>
              <a className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium">Contact Us</a>
            </div>

            {/* Auth Buttons / My Details for Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {!user ? (
                <>
                  <a  href="/userlogin"  className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100" >Login</a>
                  <a  href="/userregistration"  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800">Register</a>
                </>
              ) : (
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    My Details
                  </button>
                  {dropdownOpen && (
                  <div   className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={()=>navigate("/notifications")}>Notifications</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={()=>navigate("/myactivity")}>My Activity</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >Login as Counselor</a>
                  <div className="flex justify-center">
                    <button className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
                
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-gray-100 p-2 rounded-md text-blue-600 focus:outline-none"
              >
                <span>☰</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="block text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="/about" className="block text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium">About Us</a>
            <a href="/contact-us" className="block text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium">Contact Us</a>

            {!user ? (
              <div className="mt-3 space-y-2">
                <a href="/userlogin" className="block border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-blue-100" >Login</a>
                <a href="/userregistration" className="block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-blue-800">Register</a>
              </div>
            ) : (
              <div  ref={dropdownRef} className="mt-3 space-y-1 border-t pt-3">
                <button
                  onClick={toggleDropdown}
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  My Details
                </button>
                {dropdownOpen && (
                 <div className="pl-2">
                 <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={()=>navigate("/notifications")}>Notifications</a>
                 <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={()=>navigate("/myactivity")}>My Activity</a>
                 <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={()=>navigate("/counselor/maintabe")}>Login as Counselor</a>
                 <button className="w-full text-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
               </div>
               
                )}
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
