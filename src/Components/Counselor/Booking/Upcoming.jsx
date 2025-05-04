import React from 'react'

const Upcoming = () => {
    const data = [
        { id: '#123', name: 'Alice Johnson', time: '10:00 AM - 11:00 AM', date: '2023-08-15', amount: '$80' },
        { id: '#1234', name: 'Alice', time: '8:00 AM - 9:00 AM', date: '2023-08-15', amount: '$80' },
        { id: '#1235', name: 'Johnson', time: '10:00 AM - 11:00 AM', date: '2023-08-15', amount: '$80' },
      ];
  return (
    <div className="overflow-x-auto p-4">
   <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg text-sm">
  <thead className="bg-gray-100 text-gray-700">
    <tr>
      <th className="px-4 py-2 ">Booking ID</th>
      <th className="px-4 py-2 ">Student e-mail</th>
      <th className="px-4 py-2 ">Time</th>
      <th className="px-4 py-2 ">Date</th>
      <th className="px-4 py-2 ">Amount</th>
      <th className="px-4 py-2 ">Status</th>
      <th className="px-4 py-2 ">Action</th>
    </tr>
  </thead>
  <tbody>
    {data.map((entry, index) => (
      <tr key={index} className="border-t hover:bg-gray-50">
        <td className="px-4 py-2 font-medium">#{entry.id}</td>
        <td className="px-4 py-2">{entry.name}</td>
        <td className="px-4 py-2">{entry.time}</td>
        <td className="px-4 py-2">{entry.date}</td>
        <td className="px-4 py-2">${entry.amount}</td>
        <td className="px-4 py-2">
          <span className={`font-semibold ${entry.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
            {entry.status}
          </span>
        </td>
        <td className="px-4 py-2">
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Join session
            </button>
            <button
              className={`px-3 py-1 rounded border ${
                entry.status === 'Cancelled'
                  ? 'border-gray-600 text-gray-600 hover:bg-gray-100'
                  : 'border-gray-300 text-gray-400 cursor-not-allowed'
              }`}
              disabled={entry.status !== 'Cancelled'}
            >
              Remove
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

export default Upcoming