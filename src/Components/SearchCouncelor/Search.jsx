import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaSearch, FaStar, FaUserTie } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useget } from '../../api/authapi';
import { X } from 'lucide-react';

const Search = () => {
  const navigate = useNavigate()
  const [counselor, setCounselor] = useState([])
  useEffect(() => {
    const GetAllCounselors = async () => {
      const response = await useget("/Councelor/all-Councelor");

      if (response?.data) {
        setCounselor(response.data);

      } else {
        console.log("Error fetching counselors");
      }
    };

    GetAllCounselors();
  }, []);
  return (
    <div className="min-h-screen bg-[#f5faff] px-4 py-6 mt-16">

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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-7xl mx-auto" >
        {counselor.map((x => (


          <div key={x.counselors_id} className="bg-white rounded-lg shadow-md overflow-hidden text-sm " onClick={() => navigate(`/details/${x.counselors_id}`)}>
            <img
              src={x.image_url}
              alt={x.full_name}
              className="w-full h-48 object-contain"
            />
            <div className="p-3">
              <h2 className="font-semibold text-lg text-[#040B57] text leading-tight text-left">
                {x.full_name}
                <span className="md:text-xl text-gray-500 ml-1 flex items-center">
                  {Array.from({ length: Math.max(1, Math.round(x.avg_rating)) }, (_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1 text-sm" />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">({x.avg_rating.toFixed(1)})</span>
                </span>

              </h2>
              <div className="flex flex-wrap gap-1 mt-2">
                {x.specialization.split(',').map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-[#f0f3ff] text-[#3b45a3] border border-[#3654ff] rounded-full"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm text-[#040B57] font-medium">Rate</p>
                <p className="font-bold text-[#040B57]">${x.hourly_rate}/hour</p>
              </div>

            </div>
          </div>



        )))}
      </div>
    </div>
  )
}

export default Search