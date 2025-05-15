import React, { useEffect, useState } from 'react'
import { cancelBookings, useget, usePatch } from '../../../api/authapi';
import { toast } from 'react-toastify';

const Bookinrequest = () => {

  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("");



  const getrequest = async () => {
    try {
      const responce = await useget("/BookingByCouncelor/councelor-get-request");
      setBookings(responce.data)
   
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {

    getrequest();
  }, [])

  const editStatus = async (bookingId, status1) => {
    try {
      const data = {
        bookingId: bookingId,
        status: status1
      }
      const res = await cancelBookings(data);
      if (status1 === "declined") {
        toast.success("Booking Cancelled Successfully");
      }
      else {
        toast.success("Sending Payment Request");
      }
      // Optionally refresh data after cancel
      getrequest();


    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel booking");
    }
  };



  const reshedule = async () => {
    if (!selectedBooking || !selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    try {
      const data = {
        bookingId: selectedBooking.booking_id,
        preferdDate: new Date(selectedDate).toISOString(),
        preferdTime: selectedTime,
      };

      const response = await usePatch("/BookingByCouncelor/councelor-bookings-reshedule", data);
      toast.success("Reschedule successful");

      setShowModal(false);
      setSelectedBooking(null);
      setSelectedDate("");
      setSelectedTime("");
      getrequest();

      // Refresh the bookings list
      // const res = await useget("/BookingByCouncelor/councelor-get-request");
      // setBookings(res.data);

    } catch (error) {
      console.log(error);
      toast.error("Rescheduling failed");
    }
  };


  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
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
            {bookings === null ? (
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
                  <td className="border px-4 py-2">{new Date(entry.preferd_Date).toLocaleDateString('en-GB')}</td>
                  <td className="border px-4 py-2">$ {entry.fee}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className={`px-3 py-1 rounded ${entry.status === "request_payment"
                          ? "bg-gray-300 cursor-not-allowed text-gray-500"
                          : "bg-gray-300"
                        }`}
                      disabled={entry.status === "request_payment"}
                      onClick={() => handleRescheduleClick(entry)}
                    >
                      Reschedule
                    </button>

                    <button
                      className={`px-3 py-1 rounded ${entry.status === "request_payment"
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-green-500 text-white"
                        }`}
                      disabled={entry.status === "request_payment"} onClick={() => editStatus(entry.booking_id, "request_payment")}
                    >
                      Accept & Request Payment
                    </button>

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
              <h2 className="text-xl font-bold text-blue-900" >Reschedule Date & Time</h2>
              <button onClick={handleCloseModal}>✕</button>
            </div>

            <label className="block mb-2">Select New Date</label>
            <input
              type="date"
              min={today}
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full border rounded px-3 py-2 mb-4"
            />

            <label className="block mb-2">Select New Time Slot</label>
            <select
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full border rounded px-3 py-2 mb-4"
            >
              <option value="">-- Select --</option>
              <option value="9:00  AM - 10:00 AM">9:00 AM - 10:00 AM</option>
              <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
              <option value="11:00 Am - 12:00 PM">11:00 AM - 12:00 PM</option>
              <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
              <option value="01:00 PM - 02:00 PM">01:00 PM - 02:00 PM</option>
              <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
              <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={reshedule}
                className="bg-blue-900 text-white px-4 py-2 rounded"
              >
                Reschedule
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Bookinrequest