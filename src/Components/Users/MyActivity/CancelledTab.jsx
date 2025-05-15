import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { useget } from '../../../api/authapi';
const CancelledTab = () => {
  const [cancelled, setCancelled] = useState([]);

  const CancelledSections = async () => {
    try {
      const responce = await useget("/Booking/student-Get-Cancelled-Declained-Bookings")
      setCancelled(responce.data);
    }
    catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    CancelledSections();
  })


  return (
    <div className="p-6 space-y-6">
      {cancelled === null ?
       (
        <div className="text-center text-gray-500 font-medium py-10">
          No Cancelled bookings.
        </div>
      ) : 
      (
        cancelled.map((session) => (
          <div
            key={session.booking_id}
            className="bg-[#f6fcfc] p-6 rounded-xl border border-gray-300 shadow-sm max-w-3xl mx-auto"
          >
            <div className="flex justify-between gap-4">
              {/* Left Side: Image + Info */}
              <div className="flex gap-4">
                <img
                  src={session.image_url}
                  alt={session.full_name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h2 className="text-lg md:text-xl font-bold text-[#1a237e]">
                    {session.full_name}
                  </h2>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {session.specialization.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Fee */}
                  <div className="mt-2">
                    <span className="bg-yellow-500 text-white font-bold text-sm px-3 py-1 rounded">
                      $ {session.fee}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#1a237e]" />{" "}
                    {new Date(session.preferd_date).toLocaleDateString('en-GB')} 
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-[#1a237e]" /> {session.preferd_time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Red Status Badge */}
              <div>
                <span className="bg-red-100 text-red-700 font-medium text-sm px-3 py-1 rounded-full">
                  Cancelled
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default CancelledTab