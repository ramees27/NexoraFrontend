import React from 'react'
import { FaEye } from "react-icons/fa"
const AdminBookings = () => {
    const bookings = [
        { id: "SES002", student: "Alice Johnson", time: "10:00 AM - 11:00 AM", counselor: "Johnson Alice", date: "2023-06-15", status: "Upcoming", amount: 80 },
        { id: "SES003", student: "Alice Johnson", time: "10:00 AM - 11:00 AM", counselor: "Johnson Alice", date: "2023-06-15", status: "Pending", amount: 90 },
        { id: "SES003", student: "Alice Johnson", time: "10:00 AM - 11:00 AM", counselor: "Johnson Alice", date: "2023-06-15", status: "Completed", amount: 165 },
        { id: "SES003", student: "Alice Johnson", time: "10:00 AM - 11:00 AM", counselor: "Johnson Alice", date: "2023-06-15", status: "Rejected", amount: 189 },
        { id: "SES003", student: "Alice Johnson", time: "10:00 AM - 11:00 AM", counselor: "Johnson Alice", date: "2023-06-15", status: "Cancelled", amount: 90 },
        { id: "SES003", student: "Alice Johnson", time: "10:00 AM - 11:00 AM", counselor: "Johnson Alice", date: "2023-06-15", status: "Requested Payment", amount: 70 },
      ];
    
      const statusStyles = {
        Upcoming: "bg-green-400 text-white",
        Pending: "bg-yellow-400 text-white",
        Completed: "bg-green-600 text-white",
        Cancelled: "bg-red-500 text-white",
        Rejected: "bg-pink-500 text-white",
        "Requested Payment": "bg-blue-500 text-white",
      };
  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl font-semibold mb-4">All Bookings</h2>

      <div className="overflow-x-auto rounded-lg border-2 border-blue-400">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">Booking ID</th>
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Counselor</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{booking.id}</td>
                <td className="px-4 py-3">{booking.student}</td>
                <td className="px-4 py-3">{booking.time}</td>
                <td className="px-4 py-3">{booking.counselor}</td>
                <td className="px-4 py-3">{booking.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold ${statusStyles[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3">{booking.amount}</td>
                <td className="px-4 py-3">
                  <button className="p-1 hover:text-blue-600">
                    <FaEye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminBookings