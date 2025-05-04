import React from 'react'
import { FaStar } from 'react-icons/fa';

const CReview = () => {
    const reviews = [
        {
          name: 'Ramees',
          stars: 4,
          feedback: 'I had doubts about pursuing higher education abroad, but this session helped me explore all my options with complete clarity. The information shared was practical and up to date. Totally worth it!',
        },
        {
          name: 'Sabith',
          stars: 3,
          feedback: 'The session had potential, but it felt a little rushed. I couldn’t get all my doubts addressed in the limited time. It would be great if future sessions allowed more flexibility.',
        },
        {
          name: 'Sabith',
          stars: 4,
          feedback: 'I appreciate the personalized guidance. I feel much more focused now!',
        },
      ];
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
        <p className="text-indigo-900 text-4xl font-bold mt-2">4.0</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded shadow-sm">
            <p className="font-semibold">{review.name}</p>
            <div className="flex gap-1 text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < review.stars ? '' : 'text-gray-300'} />
              ))}
            </div>
            <p className="text-gray-700 text-sm">{review.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CReview