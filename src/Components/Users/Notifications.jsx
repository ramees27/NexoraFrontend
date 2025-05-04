import React, { useState } from 'react'
import { FaTimes, FaBell } from "react-icons/fa";
const mockNotifications = [
    {
      id: 1,
      message: "Your session with David Wilson is confirmed for April 15.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message: "New message from your counselor.",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      message: "Session cancelled by the counselor. You have been fully refunded.",
      time: "2 days ago",
      read: true,
    },
  ];
  

const Notifications = () => {
    const [notifications, setNotifications] = useState(mockNotifications);

    const dismissNotification = (id) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg mt-16">
    <h2 className="text-xl font-bold mb-4 text-[#1a237e] flex items-center gap-2">
      <FaBell /> Notifications
    </h2>

    {notifications.length === 0 ? (
      <p className="text-gray-500 text-sm text-center">No new notifications.</p>
    ) : (
      <ul className="space-y-3">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`p-3 rounded border flex justify-between items-start ${
              notification.read ? "bg-gray-100" : "bg-yellow-50"
            }`}
          >
            <div>
              <p className="text-sm">{notification.message}</p>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
          
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}

export default Notifications