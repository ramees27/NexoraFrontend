import React from 'react'
import { FaCalendarAlt, FaClock } from "react-icons/fa";
const CancelledTab = () => {
    const cancelledSessions = [
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
      
  return (
    <div className="p-6 space-y-6">
      {cancelledSessions.map((session) => (
        <div
          key={session.id}
          className="bg-[#f6fcfc] p-6 rounded-xl border border-gray-300 shadow-sm max-w-3xl mx-auto"
        >
          <div className="flex gap-4">
            {/* Profile Image */}
            <img
              src={session.profilePic}
              alt={session.name}
              className="w-12 h-12 rounded-full object-cover"
            />

            {/* Info */}
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#1a237e]">
                {session.name}
              </h2>

              <div className="flex flex-wrap gap-2 mt-1">
                {session.tags.map((tag, index) => (
                  <span
                    key={index}
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
        </div>
      ))}
    </div>
  )
}

export default CancelledTab