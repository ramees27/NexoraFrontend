import React, { useEffect, useState } from 'react'
import { cancelBookings, useget, usePatch, usePost } from '../../../api/authapi'
import { toast } from 'react-toastify'

const PendingTab = () => {
  const [pending, setPending] = useState([])


   const getPendings = async () => {
      try {
        const responce = await useget("/Booking/student/pending")
        setPending(responce.data)
        console.log(responce)
      }
      catch (error) {
        console.log("Error in get pending data", error)
      }
    }


  useEffect(() => {
   
    getPendings()
  },[])
  
  //  const {
  //   data: techniciansData,
  //   refetch: techniciansDataRefetch,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["getTechnicians", searchTerm],
  //   queryFn: () => getTechnicians({ search: searchTerm }),
  // });

  // Define it here so button can access it
  const editStatus = async (bookingId, status) => {
    try {
      const data={
        bookingId :bookingId,
        status :status
      }
      const res = await cancelBookings(data);
      toast.success("Booking Cancelled Successfully");
      // Optionally refresh data after cancel
      getPendings();


    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel booking");
    }
  };
   const confirmPayment = async (bookingId) => {
    try {
      
      
      const res = await usePatch(`/Booking/confirm-payment?bookingId=${bookingId}`);
      toast.success("Payment Successfully completed");
       getPendings();
      // Optionally refresh data after cancel
    } catch (error) {
      console.log(error);
      toast.error("Failed to make payments");
    }
  };
 


  return (
     <>
  {pending === null ? (
    <div className="text-center text-gray-600 mt-10 text-lg font-semibold">
      No Pending bookings
    </div>
  ) : (
    pending.map((session) => {
      const isAccepted = session.status === "request_payment";
      return (
        <div
          key={session.booking_id}
          className="border border-gray-300 rounded-xl p-6 shadow-md bg-[#f6fcfc] max-w-3xl mx-auto mb-6"
        >
          {/* Header Row */}
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <img
                src={session.image_url}
                alt={session.full_name}
                className="w-16 h-16 rounded-full object-contain"
              />
              <div>
                <h2 className="text-xl font-bold text-[#1a237e]">{session.full_name}</h2>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    📅 <span>{new Date(session.preferd_date).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    ⏰ <span>{session.preferd_time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price and Buttons */}
            <div className="flex flex-col items-end gap-2">
              <span className="bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded">
                $ {session.fee}
              </span>
              <button
                className="text-sm px-4 py-1 border border-gray-400 rounded text-gray-700"
                onClick={() => editStatus(session.booking_id, "cancelled")}
              >
                Cancel
              </button>
              <button
                disabled={!isAccepted}
                className={`text-sm px-4 py-1 rounded font-semibold ${
                  isAccepted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`} onClick={()=>confirmPayment(session.booking_id)}
              >
                Pay & Confirm
              </button>
            </div>
          </div>

          {/* Note */}
          <div className="mt-4 text-xs text-gray-600 leading-relaxed">
            <span className="font-bold text-gray-700">Note:-</span> Once the counselor accepts or
            reschedules your preferred time, review the time and proceed with payment upon confirmation.
            If the student cancels a confirmed session, only 75% will be refunded, and 25% will be retained
            as a platform service fee.
          </div>
        </div>
      );
    })
  )}
</>

  )
}


export default PendingTab