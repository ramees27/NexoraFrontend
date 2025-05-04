import React from 'react'

const Completed = () => {
    const data = [
        {
          id: 123,
          name: "Alice Johnson",
          time: "10:00 AM - 11:00 AM",
          date: "2023-06-15",
          amount: "$80"
        },
        {
          id: 1234,
          name: "Alice",
          time: "8:00 AM - 9:00 AM",
          date: "2023-06-15",
          amount: "$80"
        },
        {
          id: 1235,
          name: "Johnson",
          time: "10:00 AM - 11:00 AM",
          date: "2023-06-15",
          amount: "$80"
        }
      ];
      
  return (
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
        {data.map((entry, index) => (
          <tr key={index} className="border-t hover:bg-gray-50">
            <td className="px-4 py-2 font-medium">#{entry.id}</td>
            <td className="px-4 py-2">{entry.name}</td>
            <td className="px-4 py-2">{entry.time}</td>
            <td className="px-4 py-2">{entry.date}</td>
            <td className="px-4 py-2">{entry.amount}</td>
            <td className="px-4 py-2">
              <div className="flex gap-2">
                <button className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 text-sm">
                  View Details
                </button>
                <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 text-sm">
                  Chat & Follow up
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Completed