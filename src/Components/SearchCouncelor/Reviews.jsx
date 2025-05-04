import React from 'react'
import { FaStar } from "react-icons/fa";
const Reviews = () => {
    const reviews = [
        {
          name: "David Wilson",
          date: "12/03/2024",
          text: "Michael's guidance was invaluable in my transition to a career in data science. His industry insights and practical advice helped me land my dream job.",
          rating: 5,
        },
        {
          name: "John Doc",
          date: "12/03/2024",
          text: "Michael's technical knowledge is impressive. He provided specific guidance on which skills to develop to stay competitive in the software industry.",
          rating: 4,
        },
        {
          name: "Rachel Kim",
          date: "12/03/2024",
          text: "Excellent mentor! Michael helped me navigate the complexities of the tech industry and provided practical steps to advance my career.",
          rating: 5,
        },
      ];
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
                // key={i}
                // className={`text-2xl ${
                //   i <= averageRating ? "text-yellow-400" : "text-yellow-400 opacity-30"
                // }`}
              />
            ))}
            {/* <span className="text-2xl font-bold text-[#0d1b4c]">{averageRating.toFixed(1)}</span> */}
          </div>
        </div>

       
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-1">
                  <div className="w-6 h-6 bg-[#0d1b4c] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    👤
                  </div>
                  <h4 className="text-lg font-bold text-black">{review.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">{review.date}</p>
                <p className="text-gray-800 text-[15px]">{review.text}</p>
              </div>
              <div className="flex items-center justify-end sm:items-start sm:ml-6 mt-4 sm:mt-0">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar
                    key={i}
                    className={`text-xl ${
                      i <= review.rating ? "text-yellow-400" : "text-yellow-400 opacity-30"
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