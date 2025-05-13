import React, { useEffect, useState } from 'react'
import { cancelBookings, useget } from '../../../api/authapi';
import { toast } from 'react-toastify';

const Bookinrequest = () => {

  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const getrequest = async () => {
      try {
        const responce = await useget("/BookingByCouncelor/councelor-get-request");
        setBookings(responce.data)
        console.log(responce.data)
      }
      catch (error) {
        console.log(error)
      }
    }
    getrequest();
  }, [])

  const editStatus = async (bookingId, status) => {
    try {
      const data = {
        bookingId: bookingId,
        status: status
      }
      const res = await cancelBookings(data);
      toast.success("Booking Cancelled Successfully");
      // Optionally refresh data after cancel
      getrequest();


    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel booking");
    }
  };

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
            {bookings===null? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((entry) => (
                <tr key={entry.booking_id} className="text-center">
                  <td className="border px-4 py-2">{entry.booking_id}</td>
                  <td className="border px-4 py-2">{entry.userEmail}</td>
                  <td className="border px-4 py-2">{entry.preferd_time}</td>
                  <td className="border px-4 py-2">{entry.preferdDate}</td>
                  <td className="border px-4 py-2">$ {entry.fee}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => handleRescheduleClick(entry)}>Reschedule</button>
                    <button className="bg-green-500 text-white px-3 py-1 rounded">Accept & Request Payment</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => editStatus(entry.booking_id, "declined")}>Reject</button>
                  </td>
                </tr>
              ))
            )}
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