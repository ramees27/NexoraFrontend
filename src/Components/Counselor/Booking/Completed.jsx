import React, { useEffect, useState } from 'react';
import { useget } from '../../../api/authapi';
import { FaStar } from 'react-icons/fa';

const Completed = () => {
  const [completed, setCompleted] = useState([]);
  const [review, setReview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const GetCompleted = async () => {
    try {
      const response = await useget("/BookingByCouncelor/councelor-get-completed-bookings");
      setCompleted(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetReviewByBookingId = async (bookingid) => {
    try {
      const response = await useget(`/Review/get/review/${bookingid}`);
      setReview(response.data);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setReview(null);
  };

  useEffect(() => {
    GetCompleted();
  }, []);

 return (
  <>
    {/* Table */}
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full table-auto text-sm text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3">Booking ID</th>
            <th className="px-4 py-3">Student e-mail</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {completed && completed.length > 0 ? (
            completed.map((entry) => (
              <tr key={entry.booking_id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">#{entry.booking_id}</td>
                <td className="px-4 py-2">{entry.userEmail}</td>
                <td className="px-4 py-2">{entry.preferd_time}</td>
                <td className="px-4 py-2">
                  {new Date(entry.preferd_Date).toLocaleDateString('en-GB')}
                </td>
                <td className="px-4 py-2">${entry.fee}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 text-sm"
                      onClick={() => GetReviewByBookingId(entry.booking_id)}
                    >
                      View Review
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 text-sm">
                      Chat & Follow up
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-6">
                No completed bookings
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Modal */}
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
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? '' : 'text-gray-300'} />
                ))}
              </div>

              {/* Review Text */}
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
      export default Completed;
