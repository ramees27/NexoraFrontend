import React, { useContext, useEffect, useState } from 'react'
import { useget, usePatch } from '../../api/authapi';
import { UsersContext } from '../Context/UserContext';

const AdminPayments = () => {
  const [payments, setPayments] = useState([])
  const[PaymentSummery,setPaymentsSummery]=useState([])
  const[pay,setPay]=useState({})
  const{getPaymentdetails}=useContext(UsersContext)
  const getPayments = async () => {
    try {
      const response = await useget("/AdminPayment/payment-Details")
      setPayments(response.data)
     
    }
    catch (error) {
      console.log(error);

    }

  }

   const getPaymentsSummery = async () => {
    try {
      const response = await useget("/AdminPayment/payment-summary")
      setPaymentsSummery(response.data)
   
    }
    catch (error) {
      console.log(error);

    }

  }
  const  paymet=async()=>{
    const res= await getPaymentdetails()
    setPay(res)
   

  }
 const payPaymenttoCouncelor=async(id)=>{
  try{

  
  const responce= await usePatch(`/AdminPayment/Review-payment-update?booking_id=${id}`)
  console.log(responce.data);
   getPayments()
    paymet();
    getPaymentsSummery()
  }
  catch(error){
    console.log(error);
    
  }
 }


  useEffect(() => {
    getPayments()
    paymet();
    getPaymentsSummery()
  }, [])
  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p>Total Received Amount</p>
          <h2 className="text-xl font-bold">${pay?.commission_amount + pay?.counselor_amount}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p>Total Paid Amount</p>
          <h2 className="text-xl font-bold">${PaymentSummery.paidAmount}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p>Payment Due</p>
          <h2 className="text-xl font-bold">${PaymentSummery.pendingAmount}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p>Platform Fee</p>
          <h2 className="text-xl font-bold">${PaymentSummery.commisionAmout}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p>Total Expenses (Paid+Due)</p>
          <h2 className="text-xl font-bold">${PaymentSummery.paidAmount+PaymentSummery.pendingAmount}</h2>
        </div>
      </div>

      <table className="min-w-full mt-6 text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Booking ID</th>
            <th className="p-2 border">Student E-mail</th>
            <th className="p-2 border">Counselor Name</th>
            <th className="p-2 border">Session Date</th>
            <th className="p-2 border">Session Status</th>
            <th className="p-2 border">Counselor UPI ID</th>
            <th className="p-2 border">Total Receipt</th>
            <th className="p-2 border">Pay Amount </th>
            <th className="p-2 border">Paid Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="p-2 border">{item.booking_id}</td>
              <td className="p-2 border">{item.student_username}</td>
              <td className="p-2 border">{item.counselor_name}</td>
              <td className="p-2 border">{new Date(item.preferd_date).toLocaleDateString()}</td>
              <td className="p-2 border">
                {item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}
              </td>
              <td className="p-2 border">{item.upi_id}</td>
              <td className="p-2 border">₹{item.total_amount}</td>
              <td className="p-2 border">₹{item.counselor_amount}</td>
              <td className="p-3">
                {item.paid_on === "0001-01-01T00:00:00" ? "—" : new Date(item.paid_on).toLocaleDateString("en-GB")}
              </td>


              <td className={`p-2 border ${item.admin_payout_status === "pending" ? "text-orange-500" : "text-green-600"}`}>{item.admin_payout_status}</td>
              <td className="p-2 border">
                <button className="mr-2 px-3 py-1 rounded border">View</button>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                  disabled={
                    !(
                      (item.status === "cancelled" || item.status === "completed") &&
                      item.payment_status === true &&
                      item.admin_payout_status === "pending"
                    )
                  }
              onClick={()=>payPaymenttoCouncelor(item.booking_id)}  >
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};




export default AdminPayments