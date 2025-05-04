import React, { useState } from 'react'

const Bookinrequest = () => {
   const data = [
    { id: '#123', name: 'Alice Johnson', time: '10:00 AM - 11:00 AM', date: '2023-08-15', amount: '$80' },
    { id: '#1234', name: 'Alice', time: '8:00 AM - 9:00 AM', date: '2023-08-15', amount: '$80' },
    { id: '#1235', name: 'Johnson', time: '10:00 AM - 11:00 AM', date: '2023-08-15', amount: '$80' },
  ];
  
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleRescheduleClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };
  return (
    <>
    <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Booking ID</th>
          <th className="border px-4 py-2">Student e-mail</th>
          <th className="border px-4 py-2">Time</th>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Amount</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index} className="text-center">
            <td className="border px-4 py-2">{entry.id}</td>
            <td className="border px-4 py-2">{entry.name}</td>
            <td className="border px-4 py-2">{entry.time}</td>
            <td className="border px-4 py-2">{entry.date}</td>
            <td className="border px-4 py-2">{entry.amount}</td>
            <td className="border px-4 py-2 space-x-2">
              <button className="bg-gray-300 px-3 py-1 rounded"  onClick={() => handleRescheduleClick(entry)}>Reschedule</button>
              <button className="bg-green-500 text-white px-3 py-1 rounded">Accept & Request Payment</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
   {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-900">Reschedule Date & Time</h2>
          <button onClick={handleCloseModal}>✕</button>
        </div>

        <label className="block mb-2">Select New Date</label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2 mb-4"
          defaultValue="2025-04-10"
        />

        <label className="block mb-2">Select New Time Slot</label>
        <select className="w-full border rounded px-3 py-2 mb-4">
          <option>9:00 AM - 10:00 AM</option>
          <option>10:00 AM - 11:00 AM</option>
          <option>1:00 PM - 2:00 PM</option>
        </select>

        <div className="flex justify-between">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            className="bg-blue-900 text-white px-4 py-2 rounded"
          >
            Request Payment
          </button>
        </div>
      </div>
    </div>
  )}
</>
  )
}

export default Bookinrequest