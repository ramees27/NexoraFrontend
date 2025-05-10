import React, { useEffect, useState } from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import About from './About';
import Reviews from './Reviews';
import BookSessionModal from './BookSessionModal';
import { useParams } from 'react-router-dom';
import { useget } from '../../api/authapi';

const Details = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isOpen, setIsOpen] = useState(false);
  const [Counselor, setCounselor] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const GetCounselor = async () => {
      try {
        const response = await useget(`/Councelor/Councelor-By-Id?CouncellorId=${id}`);

        if (response?.data) {
          setCounselor(response.data);  // Set the counselor data
        } else {
          console.log("Error fetching counselor data");
        }
      } catch (error) {
        console.error("Error fetching counselor data:", error);
      }
    };

    GetCounselor();
  }, [id]);

  return (
    <div className="min-h-screen bg-blue-50 px-4 md:px-8 font-serif">
      {/* Back button */}
      <div className="mt-16 flex justify-start ">
        <button className="bg-black text-white px-3 py-1 rounded-md mt-3 mb-1">← Back to Home</button>
      </div>


      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row bg-blue-100 rounded-xl shadow-md font-sans">
        {/* Profile Image */}
        <img
          src={Counselor.image_url}

          alt={Counselor.full_name}
          className="w-full md:w-[400px] h-[400px] object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
        />

        {/* Content */}
        <div className="flex flex-col justify-between px-6 py-6 w-full h-[400px] text-left">
          <div>
            <h2 className="text-7xl font-extrabold text-blue-900 mb-4">{Counselor.full_name}</h2>

            <div className="flex flex-wrap gap-3 mb-4">
              {Counselor.specialization?.split(',').map((item, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-[#f0f3ff] text-[#3b45a3] border border-[#3654ff] rounded-full"
                >
                  {item.trim()}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 text-yellow-400 text-xl mb-3">
              {/* Render stars based on the average rating */}
              {Array.from({ length: Math.max(1, Math.round(Counselor?.avg_rating || 0)) }, (_, i) => (
                <FaStar key={i} className="text-yellow-400 mr-1 text-sm" />
              ))}

              {/* Display the review count and the average rating */}
              <span className="text-gray-700 font-medium text-base ml-2">
                ({Counselor?.avg_rating || 0} )
              </span>
            </div>

            <p className="text-gray-700 text-lg mb-1">
              <strong>Experience:</strong> {Counselor.experience}+ years
            </p>
            <p className="text-xl font-bold text-gray-900 mt-4">Rate:- ${Counselor.hourly_rate}/hour</p>
          </div>


          <div>
            <button
              className="w-full bg-indigo-700 text-white py-3 rounded-md text-lg font-semibold hover:bg-indigo-800 transition"
              onClick={() => setIsOpen(true)}
            >
              Book a Session
            </button>

            {isOpen && <BookSessionModal onClose={() => setIsOpen(false)} />}

          </div>
        </div>
      </div>





      {/* Tabs */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setActiveTab('about')}
          className={`px-6 py-2 rounded-md text-md font-semibold border ${activeTab === 'about' ? 'bg-white text-black shadow-md' : 'bg-blue-200 text-blue-800'
            }`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-6 py-2 rounded-md text-md font-semibold border ${activeTab === 'reviews' ? 'bg-white text-black shadow-md' : 'bg-blue-200 text-blue-800'
            }`}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content Placeholder */}
      <div className="mt-6">
        {activeTab === 'about' ? <About data={Counselor}/> : <Reviews data={Counselor} />}

      </div>
    </div>

  )
}

export default Details