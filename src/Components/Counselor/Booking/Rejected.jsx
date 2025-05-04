import React from 'react'

const Rejected = () => {
    const data = [
        { id: '#123', name: 'Alice Johnson', time: '10:00 AM - 11:00 AM', date: '2023-08-15', amount: '$80' },
        { id: '#1234', name: 'Alice', time: '8:00 AM - 9:00 AM', date: '2023-08-15', amount: '$80' },
        { id: '#1235', name: 'Johnson', time: '10:00 AM - 11:00 AM', date: '2023-08-15', amount: '$80' },
      ];
  return (
    <div className="p-4">
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 font-medium">Booking ID</th>
            <th className="px-4 py-2 font-medium">Student e-mail</th>
            <th className="px-4 py-2 font-medium">Time</th>
            <th className="px-4 py-2 font-medium">Date</th>
            <th className="px-4 py-2 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">#{entry.id}</td>
              <td className="px-4 py-2">{entry.name}</td>
              <td className="px-4 py-2">{entry.time}</td>
              <td className="px-4 py-2">{entry.date}</td>
              <td className="px-4 py-2">${entry.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Rejected