import React from 'react'

const AdminRequest = () => {
    const applications = [
        {
          id: "CLR002",
          email: "Alice27@gmail.com",
          phone: "9087543211",
          date: "2023-06-15",
        },
        {
          id: "CLR003",
          email: "Alice27@gmail.com",
          phone: "9087543211",
          date: "2023-06-15",
        },
        {
          id: "CLR003",
          email: "Alice27@gmail.com",
          phone: "9087543211",
          date: "2023-06-15",
        },
        {
          id: "CLR003",
          email: "Alice27@gmail.com",
          phone: "9087543211",
          date: "2023-06-15",
        },
        {
          id: "CLR003",
          email: "Alice27@gmail.com",
          phone: "9087543211",
          date: "2023-06-15",
        },
        {
          id: "CLR003",
          email: "Alice27@gmail.com",
          phone: "9087543211",
          date: "2023-06-15",
        },
      ];
  return (
    <div className="p-4 md:p-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Pending Approvals</h2>
        <p className="text-sm text-gray-500">New counselor applications awaiting approval</p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h3 className="text-md font-semibold">Counselors Applications(8)</h3>
        </div>

        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">Counselor ID</th>
              <th className="px-4 py-2">Counselor E-mail</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Submitted Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{app.id}</td>
                <td className="px-4 py-3">{app.email}</td>
                <td className="px-4 py-3">{app.phone}</td>
                <td className="px-4 py-3">{app.date}</td>
                <td className="px-4 py-3 space-x-2">
                  <button className="bg-white border px-3 py-1 rounded shadow-sm hover:bg-gray-100">
                    View
                  </button>
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Accept
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminRequest
