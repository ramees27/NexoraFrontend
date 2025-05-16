import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useget } from '../../api/authapi';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Review");
  const [review, setReview] = useState([])

  const getReviews = async () => {
    try {
      const response = await useget("/Review/Get-all-review")
      setReview(response.data)
      console.log(response.data);
    }
    catch (error) {
      console.log(error);

    }

  }
  useEffect(() => {
    getReviews()
  }, [])




  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-center space-x-4">
        <button
          className={`px-4 py-1 rounded-full border ${activeTab === "Review" ? "bg-blue-100 border-blue-300" : "bg-white"
            }`}
          onClick={() => setActiveTab("Review")}
        >
          Review
        </button>
        <button disabled
          className={`px-4 py-1 rounded-full border ${activeTab === "Complaints" ? "bg-blue-100 border-blue-300" : "bg-white"
            }`}
          onClick={() => setActiveTab("Complaints")}
        >
          Complaints
        </button>
      </div>

      {/* Conditionally render content based on activeTab */}
      {activeTab === "Review" ? (
        <div>
          <h3 className="text-xl font-semibold"> Latest Reviews</h3>
          <p className="text-sm text-gray-600 mb-4">({review.length})</p>
          <div className="space-y-4">
            {review.map((review, index) => (
              <div
                key={index}
                className={`p-4 border rounded-xl ${review.review}`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
  {(review.username || "?")[0].toUpperCase()}
</div>
                  <div>
                   <h4 className="font-bold text-lg leading-4">
  {review.username.charAt(0).toUpperCase() + review.username.slice(1)}
</h4>

                   <p className="text-xs text-gray-500">
  {new Date(review.created_at).toLocaleDateString()}
</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">{review.review}</p>
                <div className="mt-2 text-yellow-400 text-lg flex">
  {Array.from({ length: review.rating }).map((_, i) => (
    <FaStar key={i} />
  ))}
</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center">Complaints Management</h3>
          <p className="text-center text-gray-600">View and handle user complaints</p>
          <div className="overflow-x-auto">
            <table className="min-w-full mt-4 border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Cmp ID</th>
                  <th className="px-4 py-2 border">Section Id</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Complainant</th>
                  <th className="px-4 py-2 border">Subject</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaintsData.map((item, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="px-4 py-2 border">{item.cmpId}</td>
                    <td className="px-4 py-2 border">{item.sectionId}</td>
                    <td className="px-4 py-2 border">{item.date}</td>
                    <td className="px-4 py-2 border">{item.complainant}</td>
                    <td className="px-4 py-2 border">{item.subject}</td>
                    <td className="px-4 py-2 border">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-2 border">
                      <FiEye className="inline-block" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
