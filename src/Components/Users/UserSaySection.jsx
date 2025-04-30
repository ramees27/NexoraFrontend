import React from 'react'
import { FaStar, FaUser } from "react-icons/fa";

const UserSaySection = () => {
  return (
    <section className="bg-[#F0FAFF] py-16 px-4">
    <div className="max-w-6xl mx-auto text-center mb-12">
      <h2 className="text-3xl font-bold text-[#040B57] mb-2">
        What Our Users Say
      </h2>
      <p className="text-[#4B4F58]">
        Read about the experiences of students and professionals who have used our platform.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between"
        >
          {/* Rating */}
          <div className="flex items-center text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="mr-1" />
            ))}
          </div>

          {/* Quote */}
          <p className="text-gray-700 mb-6">
            “The guidance I received from my counselor was invaluable. They helped me
            identify my strengths and find a career path that aligns with my passions.”
          </p>

          {/* User Info */}
          <div className="flex items-center mt-auto">
            <FaUser className="text-[#040B57] text-xl mr-3" />
            <div>
              <h4 className="text-[#040B57] font-semibold leading-none">John Doc</h4>
              <p className="text-sm text-gray-500">Marketing Student</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
  )
}

export default UserSaySection
