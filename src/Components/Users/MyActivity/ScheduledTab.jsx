import React, { useEffect, useState } from 'react'
import { FaVideo, FaCalendarAlt, FaClock } from "react-icons/fa";
import { cancelBookings, useget, usePatch, usePatchForCancel } from '../../../api/authapi';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
const ScheduledTab = () => {
  const [scheduled, setScheduled] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  console.log(scheduled)
  const navigate=useNavigate();
  const getScheduledBookings = async () => {
    try {
      const response = await useget("/Booking/student-Get-ScheduledBookings")
      setScheduled(response.data)
      console.log(setScheduled)
    }
    catch (error) {
      //  console.log(error);

    }

  }
  const cancelbookings=(data)=>{
    try{
      const responce=usePatchForCancel(`/Booking/student-Cancelle-Bookings?bookingId=${data}`)
      console.log(responce.data)
       getScheduledBookings()
    }
    catch(error){
      console.log((error));
      
    }
  }

  const editStatus = async (bookingId, status) => {
      try {
        const data={
          bookingId :bookingId,
          status :status
        }
        const res = await cancelBookings(data);
        toast.success("Booking Cancelled Successfully");
        // Optionally refresh data after cancel
     getScheduledBookings()
  
  
      } catch (error) {
        console.log(error);
        toast.error("Failed to cancel booking");
      }
    };

  useEffect(() => {
    getScheduledBookings()
  }, [])
  return (
    <div className="p-6 space-y-6">
      {activeSession ? (
        <VideoCallUser bookingId={activeSession.booking_id} userName={activeSession.full_name} />
      ) : (
        <>
          {scheduled === null ? (
            <div className="text-center text-gray-500 font-medium py-10">
              No Scheduled Bookings.
            </div>
          ) : (
            scheduled.map((session) => (
              <div
                key={session.booking_id}
                className="bg-[#f6fcfc] p-6 rounded-xl border border-gray-300 shadow-md max-w-4xl mx-auto"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Profile info... */}
                  <div className="flex gap-4">
                    <img src={session.image_url} alt={session.full_name} className="w-16 h-16 rounded-full" />
                    <div>
                      <h2 className="text-xl font-bold text-[#1a237e]">{session.full_name}</h2>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {session.specialization.split(',').map((tag, index) => (
                          <span key={index} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-semibold">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-[#1a237e]" />
                          <span>{new Date(session.preferd_date).toLocaleDateString('en-GB')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaClock className="text-[#1a237e]" />
                          <span>{session.preferd_time}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="bg-yellow-500 text-white font-bold text-sm px-3 py-1 rounded">
                          $ {session.fee}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded" onClick={() => cancelbookings(session.booking_id)}>
                      Cancel Session
                    </button>
                   <button
  className="bg-[#1a237e] hover:bg-[#0f1a59] text-white font-semibold text-sm px-4 py-2 rounded flex items-center gap-2"
  onClick={() => navigate(`/video-call/${session.booking_id}/${session.counselor_id}`)}
>
  <FaVideo /> Join Session
</button>

                  </div>
                </div>

                {/* Note */}
                <p className="mt-6 text-xs text-gray-700">
                  <strong>Note:</strong> If a counselor cancels... (refund policy)
                </p>
              </div>
            ))
          )}
        </>
      )}
    </div>
  )
}

export default ScheduledTab