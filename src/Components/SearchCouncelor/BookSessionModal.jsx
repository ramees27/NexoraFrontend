import React from 'react'
import { useNavigate } from 'react-router-dom'

const BookSessionModal = ({ onClose }) => {
    const navigate=useNavigate();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg p-6 shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 text-xl">×</button>

        <h2 className="text-2xl font-bold text-[#0d1b4c] mb-4">Book a Session</h2>

        <p className="text-[#0d1b4c] mb-2">Select a date, time for your counseling session.</p>

        <div className="mb-4">
          <label className="block text-sm text-[#0d1b4c] mb-1">Select Date</label>
          <input type="date" className="w-full border rounded-md px-3 py-2" defaultValue="2025-04-10" />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-[#0d1b4c] mb-1">Select Time Slot</label>
          <select className="w-full border rounded-md px-3 py-2">
            <option>9:00 AM - 10:00 AM</option>
        
          </select>
        </div>

        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between text-sm text-[#0d1b4c] mb-1">
            <span>Session Fee</span>
            <span>$75.00</span>
          </div>
          <div className="flex justify-between text-sm text-[#0d1b4c] mb-1">
            <span>Platform Fee</span>
            <span>$7.50</span>
          </div>
          <div className="flex justify-between font-bold text-[#0d1b4c]">
            <span>Total</span>
            <span>$82.50</span>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-4">
          Once a session is booked, you can track its status under My Activity. If the counselor accepts your
          preferred time, you may proceed with payment to confirm the session. If the counselor suggests a
          new time, you can either accept and pay, or decline and rebook with a different time preference.
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border border-gray-400 rounded-md text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 transition" onClick={()=>navigate("/myactivity")}>
            Book Session
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookSessionModal