import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { useget } from '../../../api/authapi';

const CReview = () => {
  const [avgRating, setAvgRating] = useState([])
  const [reviews, setReviews] = useState([])
  const getavreageRating = async () => {
    try {
      const response = await useget("/Review/Get-Average-Rating")
      setAvgRating(response.data)
      console.log(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }
  const getAllReview = async () => {
    try {
      const response = await useget("/Review/Get/Review/by/ConcelorId")
      setReviews(response.data);
      console.log(response.data)
    }
    catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getavreageRating();
    getAllReview();
  }, [])


  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto mt-16">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-indigo-900 flex justify-center items-center gap-2">
          <span role="img" aria-label="star">🌟</span>Your Reviews & Feedback
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          See what students are saying about your guidance and track your impact on their career journey.
        </p>
      </div>

      <div className="flex flex-col items-center mb-6">
        <FaStar className="text-yellow-400 text-5xl md:text-6xl" />
        <p className="text-indigo-900 text-4xl font-bold mt-2">{avgRating.rating}.0</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-xl shadow-sm">

            {/* Top row: Username and stars */}
            <div className="flex justify-between items-center mb-1">
              <p className="font-semibold text-indigo-900">{review.username}</p>
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? '' : 'text-gray-300'} />
                ))}
              </div>
            </div>

            {/* Review and Date row */}
<div className="flex justify-between items-start w-full">
  <p className="text-gray-700 text-sm text-left">{review.review}</p>
  <p className="text-xs text-gray-500 text-right min-w-fit">
    {new Date(review.created_at).toLocaleDateString()}
  </p>
</div>

          </div>
        ))}
      </div>


    </div>
  )
}

export default CReview