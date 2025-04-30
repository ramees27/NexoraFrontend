import React from 'react'
import { FaStar } from 'react-icons/fa';

const TopRatedSection = () => {
  return (
    <section className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#040B57]">
          Top Rated Counselors
        </h2>
        <p className="text-gray-600 mt-2">
          Connect with our highly rated career guidance experts
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] transition transform hover:-translate-y-1"
          >
          
            <div className="h-60 bg-gray-200 w-full"></div>

            {/* Content */}
            <div className="p-4">
            <h3 className="text-lg font-semibold text-[#040B57] bg-opacity-50 px-2 py-1 rounded -mt-16 relative z-10 text-left w-full">
             Name
                </h3>

              <div className="flex items-center gap-1 mt-4 text-yellow-500 text-sm">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

            
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-3 py-1 rounded-full border border-[#040B57] text-[#040B57]">
                  Data Science
                </span>
                <span className="text-xs px-3 py-1 rounded-full border border-[#040B57] text-[#040B57]">
                  Software Development
                </span>
              </div>

           
              <div className="mt-4 flex justify-between items-center text-sm">
                <span className="text-gray-500">Starting from</span>
                <span className="text-[#040B57] font-bold">$75/hour</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-10">
        <button className="bg-[#040B57] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#060e70] transition">
          View all Counselors
        </button>
      </div>
    </div>
  </section>
  )
}

export default TopRatedSection