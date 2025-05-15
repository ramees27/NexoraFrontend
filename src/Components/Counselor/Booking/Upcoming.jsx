import React, { useEffect, useState } from 'react'
import { cancelBookings, useget } from '../../../api/authapi';
import { toast } from 'react-toastify';

const Upcoming = () => {
  const [upcoming, setUpcoming] = useState([]);

  const getUpcoming = async () => {
    try {
      const response = await useget("/BookingByCouncelor/councelor-get-Confirmed-bookings");
      setUpcoming(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUpcoming();
  }, []);

const editStatus = async (bookingId, status) => {
      try {
        const data={
          bookingId :bookingId,
          status :status
        }
        const res = await cancelBookings(data);
        toast.success("Booking Removed Successfully");
        // Optionally refresh data after cancel
     getUpcoming()
  
  
      } catch (error) {
        console.log(error);
        toast.error("Failed to Remove booking");
      }
    };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Booking ID</th>
            <th className="px-4 py-2">Student e-mail</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {upcoming === null ? (
            <tr>
              <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                No upcoming bookings found.
              </td>
            </tr>
          ) : (
            upcoming.map((entry) => (
              <tr key={entry.booking_id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">#{entry.booking_id}</td>
                <td className="px-4 py-2">{entry.userEmail}</td>
                <td className="px-4 py-2">{entry.preferd_time}</td>
                <td className="px-4 py-2">{new Date(entry.preferd_Date).toLocaleDateString('en-GB')}</td>
                <td className="px-4 py-2">${entry.fee}</td>
                <td className="px-4 py-2">
                  <span className={`font-semibold ${entry.is_active ? 'text-green-600' : 'text-red-600'}`}>
                    {entry.is_active ? 'Active' : 'Cancelled'}
                  </span>

                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    {/* Join session button */}
                    <button
                      className={`px-3 py-1 rounded text-white ${entry.is_active
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                      disabled={!entry.is_active}
                    >
                      Join session
                    </button>

                    {/* Remove button */}
                    <button
                      className={`px-3 py-1 rounded border ${!entry.is_active
                        ? 'border-gray-600 text-gray-600 hover:bg-gray-100'
                        : 'border-gray-300 text-gray-400 cursor-not-allowed'
                        }`}
                      disabled={entry.is_active}
                      onClick={()=>editStatus(entry.booking_id,"cancelled")}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>


  )
}

export default Upcoming