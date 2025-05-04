import React, { useState } from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import About from './About';
import Reviews from './Reviews';
import BookSessionModal from './BookSessionModal';

const Details = () => {
    const [activeTab, setActiveTab] = useState('about');
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-blue-50 px-4 md:px-8 font-serif">
      {/* Back button */}
      <div className="mt-16 flex justify-start ">
  <button className="bg-black text-white px-3 py-1 rounded-md mt-3 mb-1">← Back to Home</button>
</div>

     {/* Profile Card */}
    {/* Profile Card */}
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row bg-blue-100 rounded-xl shadow-md font-sans">
  {/* Profile Image */}
  <img
    
    alt="Profile"
    className="w-full md:w-[400px] h-[400px] object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
  />

  {/* Content */}
  <div className="flex flex-col justify-between px-6 py-6 w-full h-[400px] text-left">
    <div>
      <h2 className="text-7xl font-extrabold text-blue-900 mb-4">Dr. John Doe</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        <span className="px-4 py-1 bg-blue-300 text-blue-900 rounded-full border text-md font-medium">
          Software Development
        </span>
        <span className="px-4 py-1 bg-blue-300 text-blue-900  rounded-full border text-md font-medium">
          Data Science
        </span>
      </div>

      <div className="flex items-center gap-1 text-yellow-400 text-xl mb-3">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <span className="text-gray-700 font-medium text-base ml-2">(4.0 / 87 reviews)</span>
      </div>

      <p className="text-gray-700 text-lg mb-1">
        <strong>Experience:</strong> 15+ years
      </p>
      <p className="text-xl font-bold text-gray-900 mt-4">$75/hour</p>
    </div>

    {/* Full-width Button at Bottom */}
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
          className={`px-6 py-2 rounded-md text-md font-semibold border ${
            activeTab === 'about' ? 'bg-white text-black shadow-md' : 'bg-blue-200 text-blue-800'
          }`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-6 py-2 rounded-md text-md font-semibold border ${
            activeTab === 'reviews' ? 'bg-white text-black shadow-md' : 'bg-blue-200 text-blue-800'
          }`}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content Placeholder */}
      <div className="mt-6">
        {activeTab === 'about' ? <About /> : <Reviews />}
 
      </div>
    </div>

  )
}

export default Details