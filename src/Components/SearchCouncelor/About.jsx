import React, { useEffect, useState } from 'react'
import { FaUserGraduate, FaCertificate } from "react-icons/fa";
import { PiGraduationCapFill } from "react-icons/pi";
import { useget } from '../../api/authapi';
const About = ({ data }) => {
  console.log(data)
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const GetEducation = async () => {
      try {
        const response = await useget(`/Councelor/get/education/id?id=${data.counselors_id}`);
        if (response?.data) {
          setEducation(response.data);
        } else {
          console.log("Error fetching education data");
        }
      } catch (error) {
        console.error("Error fetching counselor data:", error);
      }
    };

    GetEducation();
  }, [data]);


  return (
    <div className="bg-[#e6f2ef] py-10 px-4">
      <div className="bg-white max-w-5xl mx-auto p-8 rounded-lg shadow-md text-left">
        <h2 className="text-left text-3xl md:text-4xl font-bold mb-4 text-gray-900">About Me</h2>
        <p className="text-left text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
          {data.short_bio}
        </p>

        {/* Specialization */}
        <h3 className="text-left text-2xl md:text-3xl font-bold mb-4 text-gray-900">Specialization</h3>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-8">
          {data.specialization?.split(',').map((item, index) => (
            <div className="flex items-center gap-3 text-lg text-gray-800" key={index}>
              <FaCertificate className="text-indigo-600 bg-indigo-100 p-2 rounded-full text-4xl" />
              <span className="text-left">{item.trim()}</span>
            </div>
          ))}
        </div>


        {/* Education */}
        <h3 className="text-left text-2xl md:text-3xl font-bold mb-4 text-gray-900">Education</h3>
        {education.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-lg text-gray-800">
            <PiGraduationCapFill className="text-indigo-600 bg-indigo-100 p-2 rounded-full text-4xl" />
            <span className="text-left">{item.qualification}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About