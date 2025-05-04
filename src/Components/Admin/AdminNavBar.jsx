import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const AdminNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const isActive = (path) => location.pathname === path;
  return (
    <div className="w-full p-4">
    {/* Heading Section */}
    <div className="mb-2">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <p className="text-sm text-gray-500">Manage bookings, students, Counselors, and Payment</p>
    </div>

    <hr className="mb-4" />

    {/* Nav Buttons */}
    <div className="bg-gray-100 rounded-md px-4 py-2">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate('/admin/admindashboard')}
          className={`text-sm px-4 py-1.5 rounded ${
            isActive('/admin/admindashboard') ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate('/admin/adminbookings')}
          className={`text-sm px-4 py-1.5 rounded ${
            isActive('/admin/adminbookings') ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
          }`}
        >
          Bookings
        </button>

        <button
          onClick={() => navigate('/admin/adminusers')}
          className={`text-sm px-4 py-1.5 rounded ${
            isActive('/admin/adminusers') ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
          }`}
        >
          Users
        </button>

        <button
          onClick={() => navigate('/admin/adminpayments')}
          className={`text-sm px-4 py-1.5 rounded ${
            isActive('/admin/adminpayments') ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
          }`}
        >
          Payments
        </button>

        <button
          onClick={() => navigate('/admin/adminreceipt')}
          className={`text-sm px-4 py-1.5 rounded ${
            isActive('/admin/adminreceipt') ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
          }`}
        >
          Receipt
        </button>

        <button
          onClick={() => navigate('/admin/adminreview')}
          className={`text-sm px-4 py-1.5 rounded ${
            isActive('/admin/adminreview') ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
          }`}
        >
          Reviews & Contacts
        </button>
      </div>
    </div>
  </div>
  )
}

export default AdminNavBar