import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const ApplySection = () => {
    const navigate=useNavigate();
  return (
    <section className="bg-[#F0FAFF] py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 shadow-md rounded-xl overflow-hidden border border-gray-200 min-h-[500px]">
        
        {/* Left Side - Become Counselor */}
        <div className="bg-[#3C4FE0] text-white p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-6">Become Counselor</h2>
            <p className="mb-8">
              Join our platform and help students navigate their career paths.
              Share your expertise and earn while making a difference.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-white mt-1" />
                Build your professional profile
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-white mt-1" />
                Earn & Grow
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-white mt-1" />
                Set your own rates and schedule
              </li>
            </ul>   
          </div>
          <button className="bg-white text-[#3C4FE0] font-semibold py-2 px-6 rounded-md hover:bg-gray-100 transition" onClick={()=>navigate("/counselorapllication")}>
            Apply Now
          </button>
        </div>

        {/* Right Side - For Students */}
        <div className="bg-white text-[#1C2EF2] p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-6">For Students</h2>
            <p className="mb-8 text-[#1C2EF2]">
              Get personalized guidance from experienced professionals to help
              you make informed career decisions.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-4">
                <FaCheckCircle className="mt-1" />
                One-on-one career counseling sessions
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="mt-1" />
                Personalized career path recommendations
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="mt-1" />
                Expert advice from industry professionals
              </li>
            </ul>
          </div>
          <button onClick={()=>navigate("/search")} className="bg-[#1C2EF2] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#1a29d0] transition">
            Find a Counselor
          </button>
        </div>

      </div>
    </section>
  )
}

export default ApplySection