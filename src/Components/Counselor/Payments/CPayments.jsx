import React from 'react'

const CPayments = () => {
    const data = [
        { id: '#123', name: 'Alice Johnson', time: '10:00 AM - 11:00 AM', date: '2023-06-15', amount: '$80', status: 'Pending' },
        { id: '#1234', name: 'Alice', time: '8:00 AM - 9:00 AM', date: '2023-06-15', amount: '$80', status: 'Success' },
        { id: '#1235', name: 'Johnson', time: '10:00 AM - 11:00 AM', date: '2023-06-15', amount: '$80', status: 'Success' }
      ];
  return (
    <div className="p-6 mt-16">
    <h2 className="text-2xl font-bold text-center text-indigo-900 mb-1">Payment History</h2>
    <p className="text-center text-sm text-gray-600 mb-6">View your earnings and pending payments</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-100 p-6 text-center rounded shadow">
        <p className="text-gray-600 font-medium">Total Fee</p>
        <p className="text-3xl font-bold text-indigo-900">1000</p>
      </div>
      <div className="bg-gray-100 p-6 text-center rounded shadow">
        <p className="text-gray-600 font-medium">Total Earnings</p>
        <p className="text-3xl font-bold text-indigo-900">800</p>
      </div>
      <div className="bg-gray-100 p-6 text-center rounded shadow">
        <p className="text-gray-600 font-medium">Total Pending Amount</p>
        <p className="text-3xl font-bold text-indigo-900">200</p>
      </div>
    </div>

    <div className="overflow-x-auto shadow rounded">
      <table className="min-w-full table-auto text-sm text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3">Booking ID</th>
            <th className="px-4 py-3">Student e-mail</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">{entry.id}</td>
              <td className="px-4 py-2">{entry.name}</td>
              <td className="px-4 py-2">{entry.time}</td>
              <td className="px-4 py-2">{entry.date}</td>
              <td className="px-4 py-2">{entry.amount}</td>
              <td className="px-4 py-2">
                <span className={`font-semibold ${entry.status === 'Success' ? 'text-green-600' : 'text-yellow-500'}`}>
                  {entry.status}
                </span>
              </td>
              <td className="px-4 py-2">
                <button
                  className={`px-4 py-1 rounded text-white text-sm ${
                    entry.status === 'Pending' ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-300 cursor-not-allowed'
                  }`}
                  disabled={entry.status !== 'Pending'}
                >
                  Request Payment
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

export default CPayments