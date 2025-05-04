import React from 'react'

const AdminPayments = () => {
    const mockData = [
        {
          id: "CLR001",
          email: "example1@gmail.com",
          counselor: "John Doe",
          date: "2023-06-10",
          upi: "upi@bank",
          receipt: 100,
          pay: 90,
          status: "Paid"
        },
        {
          id: "CLR002",
          email: "example2@gmail.com",
          counselor: "Jane Smith",
          date: "2023-06-12",
          upi: "upi@bank",
          receipt: 120,
          pay: 108,
          status: "Pending"
        },
        {
          id: "CLR003",
          email: "example3@gmail.com",
          counselor: "Alex Ray",
          date: "2023-06-14",
          upi: "upi@bank",
          receipt: 80,
          pay: 72,
          status: "Paid"
        }
      ];
         
  return (
    <div className="p-4 space-y-6">
    <div className="grid grid-cols-5 gap-4">
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p>Total Receipt</p>
        <h2 className="text-xl font-bold">₹300</h2>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p>Total Payments</p>
        <h2 className="text-xl font-bold">₹270</h2>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p>Payment Due</p>
        <h2 className="text-xl font-bold">₹30</h2>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p>Platform Fee</p>
        <h2 className="text-xl font-bold">₹30</h2>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p>Total Expenses</p>
        <h2 className="text-xl font-bold">₹300</h2>
      </div>
    </div>

    <table className="min-w-full mt-6 text-sm border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Booking ID</th>
          <th className="p-2 border">Student E-mail</th>
          <th className="p-2 border">Counselor Name</th>
          <th className="p-2 border">Session Date</th>
          <th className="p-2 border">Counselor UPI ID</th>
          <th className="p-2 border">Total Receipt</th>
          <th className="p-2 border">Pay Amount (-10%)</th>
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
            <td className="p-2 border">{item.upi}</td>
            <td className="p-2 border">₹{item.receipt}</td>
            <td className="p-2 border">₹{item.pay}</td>
            <td className={`p-2 border ${item.status === "Paid" ? "text-green-600" : "text-orange-500"}`}>{item.status}</td>
            <td className="p-2 border">
              <button className="mr-2 px-3 py-1 rounded border">View</button>
              <button 
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50" 
                  disabled={item.status === "Pending"}
                >
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