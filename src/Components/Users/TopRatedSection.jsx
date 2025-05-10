import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useget } from '../../api/authapi';

const TopRatedSection = () => {
  const [counselor, setCounselor] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const GetTopCounselors = async () => {
      const response = await useget("/Councelor/all-Councelor");

      if (response?.data) {
        const topThree = response.data
          .sort((a, b) => b.avg_rating - a.avg_rating) // sort descending
          .slice(0, 3); 
        setCounselor(topThree);

      } else {
        console.log("Error fetching counselors");
      }
    };

    GetTopCounselors();
  }, []);


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

        {/* Counselor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {counselor.map((top) => (
            <div
              key={top.counselors_id}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] transition transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="h-60 bg-gray-100 w-full overflow-hidden">
                <img
                  src={top.image_url}
                  alt={top.full_name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#040B57] mb-2">
                  {top.full_name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
                  {Array.from({ length: top.avg_rating }, (_, i) => (
                    <FaStar key={i} />
                  ))}

                </div>


                <div className="flex flex-wrap gap-2 mt-2">
                  {top.specialization.split(",").map((spec, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full border border-[#040B57] text-[#040B57]"
                    >
                      {spec.trim()}
                    </span>
                  ))}
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
          <button
            className="bg-[#040B57] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#060e70] transition"
            onClick={() => navigate("/search")}
          >
            View all Counselors
          </button>
        </div>
      </div>
    </section>
  )
}

export default TopRatedSection