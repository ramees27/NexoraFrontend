import React from 'react'

const AdminReceipt = () => {
    const mockData = [
        {
          id: "CLR002",
          email: "Alice27@gmail.com",
          counselor: "Johnson Alice",
          date: "2023-06-15",
          scheduleDate: "2023-06-15",
          receipt: 80,
          platformFee: 8,
          status: "Received"
        },
        {
          id: "CLR003",
          email: "Alice27@gmail.com",
          counselor: "Johnson Alice",
          date: "2023-06-15",
          scheduleDate: "2023-06-15",
          receipt: 90,
          platformFee: 9,
          status: "Requested"
        },
        {
          id: "CLR003",
          email: "Alice27@gmail.com",
          counselor: "Johnson Alice",
          date: "2023-06-15",
          scheduleDate: "2023-06-15",
          receipt: 165,
          platformFee: 16.5,
          status: "Received"
        }
      ];
  return (
    <div className="p-4 space-y-6">
    <h2 className="text-2xl font-semibold text-center">Receipt</h2>

    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p>Total Receipt (From Students)</p>
        <h2 className="text-xl font-bold">₹14000</h2>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p>Total Counselor Fee (90% of Total Receipt)</p>
        <h2 className="text-xl font-bold">₹12600</h2>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p>Total Platform Fee (10% of Total Receipt)</p>
        <h2 className="text-xl font-bold">₹1400</h2>
      </div>
    </div>

    <table className="min-w-full mt-6 text-sm border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Booking ID</th>
          <th className="p-2 border">Student E-mail</th>
          <th className="p-2 border">Counselor Name</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Schedule Date</th>
          <th className="p-2 border">Total Receipt</th>
          <th className="p-2 border">Platform Fee</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {mockData.map((item, idx) => (
          <tr key={idx} className="text-center">
            <td className="p-2 border">{item.id}</td>
            <td className="p-2 border">{item.email}</td>
            <td className="p-2 border">{item.counselor}</td>
            <td className="p-2 border">{item.date}</td>
            <td className="p-2 border">{item.scheduleDate}</td>
            <td className="p-2 border">₹{item.receipt}</td>
            <td className="p-2 border">₹{item.platformFee}</td>
            <td className={`p-2 border ${item.status === "Received" ? "text-green-600" : "text-orange-500"}`}>{item.status}</td>
            <td className="p-2 border">
            <button className="mr-2 px-3 py-1 rounded border">View</button>
                <button 
                  className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50" 
                  disabled={item.status === "Requested"}
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