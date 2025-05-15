import React, { useEffect, useState } from 'react'
import { useget } from '../../../api/authapi';

const CPayments = () => {
  const [payments, setPayments] = useState([]);
  const [paymetdetails, setPaymentDetails] = useState([])
  const getPayments = async () => {
    const response = await useget("/Payment/Get-Councelor-paymentdetails")
    setPayments(response.data)
    console.log(response.data)
  }



  const getPaymentDetails = async () => {
    const response = await useget("/Payment/Get-Payment")
    setPaymentDetails(response.data)
    console.log(response.data)
  }
  useEffect(() => {
    getPayments()
    getPaymentDetails()
  }, [])
  return (
    <div className="p-6 mt-16">
      <h2 className="text-2xl font-bold text-center text-indigo-900 mb-1">Payment History</h2>
      <p className="text-center text-sm text-gray-600 mb-6">View your earnings and pending payments</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-100 p-6 text-center rounded shadow">
          <p className="text-gray-600 font-medium">Total Fee Received After Platform fee</p>
          <p className="text-3xl font-bold text-indigo-900">
            {payments?.councelorAmount || 0}
          </p>
        </div>
        <div className="bg-gray-100 p-6 text-center rounded shadow">
          <p className="text-gray-600 font-medium">Total Earnings</p>
          <p className="text-3xl font-bold text-indigo-900">  {payments?.receivedAmount || 0}</p>
        </div>
        <div className="bg-gray-100 p-6 text-center rounded shadow">
          <p className="text-gray-600 font-medium">Total Pending Amount</p>
          <p className="text-3xl font-bold text-indigo-900">{payments?.pendingAmount || 0}</p>
        </div>
      </div>

      <div className="overflow-x-auto shadow rounded">
        <table className="min-w-full table-auto text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Booking ID</th>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Totale Fee</th>
              <th className="px-4 py-3">Platform Fee</th>
              <th className="px-4 py-3">Final Payout</th>
              <th className="px-4 py-3">Secceion Status</th>
              <th className="px-4 py-3">Paid Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paymetdetails && paymetdetails.length > 0 ? (
              paymetdetails.map((entry, idx) => (
                <tr key={entry.payment_id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{entry.booking_id}</td>
                  <td className="px-4 py-2">{entry.userEmail}</td>
                  <td className="px-4 py-2">{entry.preferd_time}</td>
                  <td className="px-4 py-2">{new Date(entry.preferd_date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{entry.total_amount}</td>
                  <td className="px-4 py-2">{entry.commission_amount}</td>
                  <td className="px-4 py-2">{entry.counselor_amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`font-semibold ${entry.status === 'cancelled'
                        ? 'text-orange-600'
                        : entry.status === 'accepted'
                          ? 'text-blue-600'
                          : 'text-green-600'
                        }`}
                    >
                      {entry.status === 'cancelled'
                        ? 'Cancelled'
                        : entry.status === 'accepted'
                          ? 'Pending'
                          : 'Completed'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`font-semibold ${entry.admin_payout_status === 'pending' ? 'text-orange-600' : 'text-green-600'}`}>
                      {entry.admin_payout_status === 'pending' ? 'Pending' : 'Paid'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className={`px-4 py-1 rounded text-white text-sm ${entry.admin_payout_status === 'pending' &&
                          (entry.status === 'cancelled' || entry.status === 'completed')
                          ? 'bg-purple-700 hover:bg-purple-800'
                          : 'bg-purple-300 cursor-not-allowed'
                        }`}
                      disabled={
                        !(
                          entry.admin_payout_status === 'pending' &&
                          (entry.status === 'cancelled' || entry.status === 'completed')
                        )
                      }
                    >
                      Request Payment
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-6 text-center text-gray-500">
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default CPayments