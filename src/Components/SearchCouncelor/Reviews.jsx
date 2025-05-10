import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { useget } from '../../api/authapi';
const Reviews = ({ data }) => {
  const [reviews, setReview] = useState([])
  useEffect(() => {
    const GetReviews = async () => {
      const response = await useget(`/Review/Get-Review-Councelorid?Councelor_id=${data.counselors_id}`)
      try {
        setReview(response.data)
      }
      catch (error) {
        console.error("Error fetching counselor data:", error);
      }
    }
    GetReviews();
  }, [data])
  return (
    <div className="bg-[#e6f2ef] py-10 px-4">
      <div className="bg-white max-w-5xl mx-auto p-8 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0d1b4c] mb-1">Client Reviews</h2>
            <p className="text-lg text-[#0d1b4c]">{reviews.length} reviews</p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <FaStar
                key={i}
                className={`text-2xl ${i <= data.avg_rating ? "text-yellow-400" : "text-yellow-400 opacity-30"
                  }`}
              />
            ))}
            <span className="text-2xl font-bold text-[#0d1b4c]">{data.avg_rating.toFixed(1)}</span>
          </div>
        </div>


        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.created_at} className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-1">
                  <div className="w-6 h-6 bg-[#0d1b4c] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    👤
                  </div>
                  <h4 className="text-lg font-bold text-black">{review.username}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2 text-left font-mono">
                  {new Date(review.created_at).toLocaleDateString('en-GB')}
                </p>
                <p className="text-gray-800 text-[15px] text-left">
                  {review.review}
                </p>

              </div>
              <div className="flex items-center justify-end sm:items-start sm:ml-6 mt-4 sm:mt-0">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar
                    key={i}
                    className={`text-xl ${i <= review.rating ? "text-yellow-400" : "text-yellow-400 opacity-30"
                      }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews