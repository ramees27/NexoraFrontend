import React, { useEffect, useState } from 'react'
import { FaEye, FaStar } from "react-icons/fa"
import { useget } from '../../api/authapi'
import { use } from 'react'
const AdminBookings = () => {
  const [bookings, setBookings] = useState([])
  const[review,setReview]=useState(null)
  const[showModal,setShowModal]=useState(false)

  const GetBookings = async () => {
    try {
      const response = await useget("/DashBoard/Get-all-bookings")
      setBookings(response.data);
      console.log(response.data)
    }
    catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    GetBookings()
  }, [])

 const closeModal = () => {
    setShowModal(false);
    setReview(null);
  };
  const statusStyles = {
    pending: "bg-yellow-400 text-white",
    request_payment: "bg-blue-500 text-white",
    accepted: "bg-green-400 text-white",
    declined: "bg-pink-500 text-white",
    cancelled: "bg-red-500 text-white",
    completed: "bg-green-600 text-white",
  };

  const formatStatus = (status) => {
    if (!status) return "";
    const withSpaces = status.replace(/_/g, " ");
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  };

   const GetReviewByBookingId = async (bookingid) => {
      try {
        const response = await useget(`/Review/get/review/${bookingid}`);
        setReview(response.data);
        console.log(response.data)
        setShowModal(true);
      } catch (error) {
        console.log(error);
      }
    };

 return (
  <>
    <div className="p-4 md:p-8">
      <h2 className="text-xl font-semibold mb-4">All Bookings</h2>

      <div className="overflow-x-auto rounded-lg border-2 border-blue-400">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">Booking ID</th>
              <th className="px-4 py-2">Student E-Mail</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Counselor E-Mail</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.booking_id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">#{booking.booking_id}</td>
                <td className="px-4 py-3">{booking.studentEmail}</td>
                <td className="px-4 py-3">{booking.preferd_time}</td>
                <td className="px-4 py-3">{booking.counselorEmail}</td>
                <td className="px-4 py-3">{new Date(booking.preferd_date).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusStyles[booking.status]}`}>
                    {formatStatus(booking.status)}
                  </span>
                </td>
                <td className="px-4 py-3">{booking.fee}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => GetReviewByBookingId(booking.booking_id)}
                    className={`p-1 ${
                      booking.status === "completed"
                        ? "hover:text-blue-600"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={booking.status !== "completed"}
                  >
                    <FaEye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
          <button
            onClick={closeModal}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            &times;
          </button>
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">Review Details</h2>

          {review && review.review ? (
            <>
              <div className="flex gap-1 text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? '' : 'text-gray-300'} />
                ))}
              </div>
              <p className="text-gray-700 text-sm">{review.review}</p>
            </>
          ) : (
            <p className="text-gray-600 text-sm italic">No review added for this booking.</p>
          )}
        </div>
      </div>
    )}
  </>
);
}

export default AdminBookings