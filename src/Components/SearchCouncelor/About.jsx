import React from 'react'
import { FaUserGraduate, FaCertificate } from "react-icons/fa";
import { PiGraduationCapFill } from "react-icons/pi";
const About = () => {
  return (
    <div className="bg-[#e6f2ef] py-10 px-4">
      <div className="bg-white max-w-5xl mx-auto p-8 rounded-lg shadow-md text-left">
        <h2 className="text-left text-3xl md:text-4xl font-bold mb-4 text-gray-900">About Me</h2>
        <p className="text-left text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
          Michael Roberts is a tech industry veteran with 15+ years of experience in software development and data science.
          He provides career guidance for individuals looking to enter or advance in the tech industry, with a focus on skill
          development and job placement.
        </p>

        {/* Specialization */}
        <h3 className="text-left text-2xl md:text-3xl font-bold mb-4 text-gray-900">Specialization</h3>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-8">
          <div className="flex items-center gap-3 text-lg text-gray-800">
            <FaCertificate className="text-indigo-600 bg-indigo-100 p-2 rounded-full text-4xl" />
            <span className="text-left">Data Science</span>
          </div>
          <div className="flex items-center gap-3 text-lg text-gray-800">
            <FaCertificate className="text-indigo-600 bg-indigo-100 p-2 rounded-full text-4xl" />
            <span className="text-left">Software Development</span>
          </div>
        </div>

        {/* Education */}
        <h3 className="text-left text-2xl md:text-3xl font-bold mb-4 text-gray-900">Education</h3>
        <div className="flex items-center gap-3 text-lg text-gray-800">
          <PiGraduationCapFill className="text-indigo-600 bg-indigo-100 p-2 rounded-full text-4xl" />
          <span className="text-left">M.A. in Career Guidance and Counseling</span>
        </div>
      </div>
    </div>
  )
}

export default About