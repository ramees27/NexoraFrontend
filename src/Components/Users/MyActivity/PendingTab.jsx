import React, { useState } from 'react'

const PendingTab = () => {
  const [acceptedSessions, setAcceptedSessions] = useState([1])
  const pendingData = [
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
    {pendingData.map((session) => {
      const isAccepted = acceptedSessions.includes(session.id);
      return (
        <div
          key={session.id}
          className="border border-gray-300 rounded-xl p-6 shadow-md bg-[#f6fcfc] max-w-3xl mx-auto"
        >
          {/* Header Row */}
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <img
                src={session.profilePic}
                alt={session.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-[#1a237e]">{session.name}</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  {session.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    📅 <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    ⏰ <span>{session.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price and Buttons */}
            <div className="flex flex-col items-end gap-2">
              <span className="bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded">
                {session.price}
              </span>
              <button className="text-sm px-4 py-1 border border-gray-400 rounded text-gray-700">
                Cancel
              </button>
              <button
                disabled={!isAccepted}
                className={`text-sm px-4 py-1 rounded font-semibold ${
                  isAccepted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Pay & Confirm
              </button>
            </div>
          </div>

          {/* Note */}
          <div className="mt-4 text-xs text-gray-600 leading-relaxed">
            <span className="font-bold text-gray-700">Note:-</span> Once the counselor accepts or
            reschedules your preferred time, review the time and proceed with payment upon confirmation.
            If the student cancels a confirmed session, only 75% will be refunded, and 25% will be retained
            as a platform service fee.
          </div>
        </div>
      );
    })}
  </div>
);
  
}

export default PendingTab