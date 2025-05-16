import { useNavigate, useLocation } from 'react-router-dom';
import { logOut } from '../../api/authapi';
import { useContext } from 'react';
import { UsersContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

const AdminNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
const{setUser}=useContext(UsersContext)
  const isActive = (path) => location.pathname === path;

   const handleLogout = async () => {
    const res = await logOut()
    if (res != null) {
      setUser(false)
      toast.success("Succusfully logout")
      navigate('/userlogin'); 
    }
    else {
      toast.error("Error in Logout")
    }

  }
  return (
    <div className="w-full p-4">
      {/* Heading Section with Logout */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">
            Manage bookings, students, Counselors, and Payment
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <hr className="mb-4" />

      {/* Navigation Buttons */}
      <div className="bg-gray-100 rounded-md px-4 py-2">
        <div className="flex justify-between items-center flex-wrap gap-2">
          {[
            { label: 'Dashboard', path: '/admin/admindashboard' },
            { label: 'Bookings', path: '/admin/adminbookings' },
            { label: 'Users', path: '/admin/adminusers' },
            { label: 'Payments', path: '/admin/adminpayments' },
            { label: 'Receipt', path: '/admin/adminreceipt' },
            { label: 'Reviews & Contacts', path: '/admin/adminreview' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`text-sm px-4 py-1.5 rounded ${
                isActive(item.path)
                  ? 'bg-blue-500 text-white'
                  : 'text-black hover:bg-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
