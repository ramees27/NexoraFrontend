import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useget } from '../../api/authapi'
import { UsersContext } from '../Context/UserContext';

const AdminReceipt = () => {
  const [receipt, setReceipt] = useState([]);
  const { getPaymentdetails } = useContext(UsersContext);
  const [studentData, setStudentData] = useState([])

  const GetPay = async () => {
    const getDetails = await getPaymentdetails();
    setReceipt(getDetails)
  
  }


  const GetReceipt = async () => {
    try {
      const getDetails = await useget("/AdminPayment/payment-Details");
      setStudentData(getDetails.data)
      console.log(getDetails)
    }
    catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    GetPay()
    GetReceipt()
  }, [])
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold text-center">Receipt</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p>Total Receipt (From Students)</p>
          <h2 className="text-xl font-bold">${receipt.counselor_amount + receipt.commission_amount}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p>Total Counselor Fee (90% of Total Receipt)</p>
          <h2 className="text-xl font-bold">${receipt.counselor_amount}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p>Total Platform Fee (10% of Total Receipt)</p>
          <h2 className="text-xl font-bold">${receipt.commission_amount}</h2>
        </div>
      </div>

      <table className="min-w-full mt-6 text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Booking ID</th>
            <th className="p-2 border">Student Name</th>
            <th className="p-2 border">Counselor Name</th>
            <th className="p-2 border">Paid Date</th>
            <th className="p-2 border">Schedule Date</th>
            <th className="p-2 border">Total Receipt</th>
            <th className="p-2 border">Platform Fee</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="p-2 border">{item.booking_id}</td>
              <td className="p-2 border">{item.student_username}</td>
              <td className="p-2 border">{item.counselor_name}</td>
              <td className="p-2 border">{new Date(item.paidByStudent).toLocaleDateString("en-Gb")}</td>
              <td className="p-2 border">{new Date(item.preferd_date).toLocaleDateString("en-Gb")}</td>
              <td className="p-2 border">₹{item.total_amount}</td>
              <td className="p-2 border">₹{item.commission_amount}</td>
              <td className={`p-2 border ${item.status === "completed" ? "text-green-600" : "text-orange-500"}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}
              </td>

              <td className="p-2 border">
                <button className="mr-2 px-3 py-1 rounded border">View</button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                  disabled={!(item.status === "cancelled" && item.payment_status === true)}
                >
                  Refund
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminReceipt