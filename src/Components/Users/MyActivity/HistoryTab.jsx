import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaComments } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

const HistoryTab = () => {
    const navigate=useNavigate();
    const mockSessions = [
        {
          id: 1,
          name: "David Wilson",
          tags: ["Software Development", "Data Science"],
          date: "2025-04-15",
          time: "10:00 AM - 11:00 AM",
          price: "$82.50",
          profilePic: "https://via.placeholder.com/60",
        },
        {
          id: 2,
          name: "David Wilson",
          tags: ["Software Development", "Data Science"],
          date: "2025-04-15",
          time: "10:00 AM - 11:00 AM",
          price: "$82.50",
          profilePic: "https://via.placeholder.com/60",
        },
      ];
    
        const [showModals, setShowModal] = useState(false);
        const [selectedSession, setSelectedSession] = useState(null);
        const [rating, setRating] = useState("");
        const [review, setReview] = useState("");
        const [error, setError] = useState("");
      
      
        const openModal = (session) => {
          setSelectedSession(session);
          setShowModal(true);
          setRating("");
          setReview("");
          setError("");
        };
    
        const handleSubmit = () => {
            if (!rating || !review.trim()) {
              setError("Rating and Review are required.");
              return;
            }
        
            console.log("Saved Review", { session: selectedSession, rating, review });
            setShowModal(false);
          };      
        
  return (
    <div className="p-6 space-y-6">
    {mockSessions.map((session) => (
      <div
        key={session.id}
        className="bg-[#f6fcfc] p-6 rounded-xl border border-gray-300 shadow-sm max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-start flex-wrap">
          <div className="flex gap-4">
            <img
              src={session.profilePic}
              alt={session.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#1a237e]">{session.name}</h2>
              <div className="flex flex-wrap gap-2 mt-1">
                {session.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#1a237e]" /> {session.date}
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-[#1a237e]" /> {session.time}
                </div>
              </div>
              <div className="mt-3">
                <span className="bg-yellow-500 text-white font-bold text-sm px-3 py-1 rounded">
                  {session.price}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:items-end">
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded font-semibold"
              onClick={() => openModal(session)}
            >
              Add Review & Rating
            </button>
            <button className="bg-[#1803a3] text-white px-4 py-2 rounded font-semibold flex items-center gap-2" onClick={()=>navigate("/counselorchat")}>
              <FaComments /> Chat & Follow-up
            </button>
          </div>
        </div>
        <p className="text-sm mt-4 text-center text-[#1a237e] font-semibold">
          Note:- Facing any issues? Submit a complaint from your profile or contact us for support.
        </p>
      </div>
    ))}

    {/* Modal */}
    {showModals && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
          <h3 className="text-lg font-bold text-center text-[#1a237e] mb-4">
            Add Review for {selectedSession.name}
          </h3>

          <label className="block mb-2 font-semibold text-sm">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter rating"
          />

          <label className="block mb-2 font-semibold text-sm">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            rows="4"
            placeholder="Write your review here"
          ></textarea>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Review
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default HistoryTab