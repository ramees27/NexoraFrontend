import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaComments } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { useget, usePost } from "../../../api/authapi";
import { toast } from "react-toastify";

const HistoryTab = () => {
  const navigate = useNavigate();


  const [showModals, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState([]);
  const [checkrating, setCheckRating] = useState(null)


  const GetCompleted = async () => {
    try {
      const response = await useget("/Booking/student-Get-completed-Bookings");

      const bookingsWithReviewStatus = await Promise.all(
        response.data.map(async (booking) => {
          try {
            const reviewCheck = await useget(`/Review/Check-Review-Exists/${booking.booking_id}`);
            return { ...booking, reviewExists: reviewCheck.data }; // ✅ boolean
          } catch (error) {
            console.error("Error checking review:", error);
            return { ...booking, reviewExists: false }; // Default to false on error
          }
        })
      );

      setCompleted(bookingsWithReviewStatus);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };


  useEffect(() => {
    GetCompleted()
  }, [])

  const openModal = (session) => {
    setSelectedSession(session);
    setShowModal(true);
    setRating("");
    setReview("");
    setError("");
  };

  const handleSubmit = async (booking_id, councelor_id) => {
    if (!rating || !review.trim()) {
      setError("Rating and Review are required.");
      return;
    }

    try {
      const data = {
        counselor_id: councelor_id,
        booking_id: booking_id,
        rating: rating,
        review: review
      }
      const response = await usePost("/Review/Add-Review", data);
      setShowModal(false);
      toast.success("Review Added Suucussfully")
      console.log(response)
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {completed === null ? (
        <div className="text-center text-gray-600 mt-10 text-lg font-semibold">
          No Completed bookings
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {completed.map((session) => (
            <div
              key={session.booking_id}
              className="bg-[#f6fcfc] p-6 rounded-xl border border-gray-300 shadow-sm max-w-4xl mx-auto"
            >
              <div className="flex justify-between items-start flex-wrap">
                <div className="flex gap-4">
                  <img
                    src={session.image_url
                    }
                    alt={session.full_name}
                    className="w-12 h-12 rounded-full object-conatin"
                  />
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-[#1a237e]">{session.full_name}</h2>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {session.specialization.split(",").map((tag, i) => (
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
                        <FaCalendarAlt className="text-[#1a237e]" /> {new Date(session.preferd_date).toLocaleDateString('en-GB')}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-[#1a237e]" /> {session.preferd_time
                        }
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="bg-yellow-500 text-white font-bold text-sm px-3 py-1 rounded">
                        $ {session.fee}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:items-end">
                  {!session.reviewExists ? (
                    <button
                      className="bg-orange-500 text-white px-4 py-2 rounded font-semibold"
                      onClick={() => openModal(session, false)} // false = isEdit = no
                    >
                      Add Review & Rating
                    </button>
                  ) : (
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
                      onClick={() => openModal(session, true)} // true = isEdit = yes
                    >
                      Edit Review & Rating
                    </button>
                  )}
                  <button className="bg-[#1803a3] text-white px-4 py-2 rounded font-semibold flex items-center gap-2" onClick={() => navigate("/counselorchat")}>
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
                  Add Review for {selectedSession.full_name}
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
                    onClick={() => handleSubmit(selectedSession.booking_id, selectedSession.counselor_id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Review
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default HistoryTab