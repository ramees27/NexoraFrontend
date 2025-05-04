import React from 'react'
import { FaArrowLeft, FaSearch, FaStar, FaUserTie } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-[#f5faff] px-4 py-6 mt-16">
    {/* Back Button */}
    <div className="mb-4">
      <button className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-md text-sm font-medium">
        <FaArrowLeft /> Back to Home
      </button>
    </div>
  
    {/* Header */}
    <h1 className="text-2xl md:text-3xl font-bold text-center text-[#040B57] mb-5">
      Search by Specialized Area
    </h1>
  
    {/* Search Bar */}
    <div className="flex justify-center mb-8">
      <div className="flex items-center w-full max-w-2xl bg-white shadow-md border rounded-full overflow-hidden">
        <div className="px-3 text-gray-400">
          <FaSearch className="text-lg" />
        </div>
        <input
          type="text"
          placeholder="Eg: Data Science, Software Development"
          className="flex-grow px-2 py-2 text-sm outline-none text-gray-700"
        />
        <button className="bg-[#3654ff] hover:bg-blue-700 text-white px-5 py-2 text-sm font-semibold">
          Search
        </button>
      </div>
    </div>
  
    {/* Counselor Cards Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-7xl mx-auto" onClick={()=>navigate("/details")}>
      {/* Counselor Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden text-sm">
        <img
          src="/your-counselor-image.jpg"
          alt="Dr. John Doe"
          className="w-full h-48 object-cover"
        />
        <div className="p-3">
          <h2 className="font-semibold text-[#040B57] leading-tight">
            Dr. John Doe
            <span className="text-xs text-gray-500 ml-1 flex items-center">
              <FaStar className="text-yellow-400 mr-1 text-sm" /> 4.9 (987)
            </span>
          </h2>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="px-2 py-0.5 bg-[#f0f3ff] text-[#3b45a3] border border-[#3654ff] rounded-full">
              Data Science
            </span>
            <span className="px-2 py-0.5 bg-[#f0f3ff] text-[#3b45a3] border border-[#3654ff] rounded-full">
              Software Dev
            </span>
          </div>
          <p className="mt-2 font-bold text-right text-[#040B57]">$75/hour</p>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Search