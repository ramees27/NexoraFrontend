import React, { useEffect, useState } from 'react'
import { useget } from '../../../api/authapi';

const Rejected = () => {
    const[rejected,setRejected]=useState([]);
    const getRejected=async ()=>{
      try{
      const responce=await useget("/BookingByCouncelor/councelor-get-Cancelled-bookings");
      setRejected(responce.data)
    
      
      }
      catch(error){
        console.log(error)
      }
    }

    useEffect(()=>{
      getRejected()
    },[])
    
  return (
   <div className="p-4">
  <div className="overflow-x-auto border rounded-lg">
    <table className="min-w-full text-sm text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 font-medium">Booking ID</th>
          <th className="px-4 py-2 font-medium">Student e-mail</th>
          <th className="px-4 py-2 font-medium">Payment Status</th>
          <th className="px-4 py-2 font-medium">Time</th>
          <th className="px-4 py-2 font-medium">Date</th>
          <th className="px-4 py-2 font-medium">Amount</th>
        </tr>
      </thead>
      <tbody>
        {rejected === null ? (
          <tr>
            <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
              No bookings found.
            </td>
          </tr>
        ) : (
          rejected.map((entry, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">#{entry.booking_id}</td>
              <td className="px-4 py-2">{entry.userEmail}</td>
              <td className="px-4 py-2">
                {entry.payment_status ? (
                  <span className="text-green-600 font-semibold">Done</span>
                ) : (
                  <span className="text-red-600 font-semibold">Not Paid</span>
                )}
              </td>
              <td className="px-4 py-2">{entry.preferd_time}</td>
              <td className="px-4 py-2">{new Date (entry.preferd_Date).toLocaleDateString()}</td>
              <td className="px-4 py-2">${entry.fee}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
  )
}

export default Rejected