import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa';

const AdminUsers = () => {
    const [selectedTab, setSelectedTab] = useState("counselors");

    const counselorData = [
        { id: "CLR002", email: "Alice27@gmail.com", name: "Johnson Alice", joinDate: "2023-06-15", status: "Active" },
        { id: "CLR003", email: "Alice27@gmail.com", name: "Johnson Alice", joinDate: "2023-06-15", status: "Pending Approval" },
        { id: "CLR003", email: "Alice27@gmail.com", name: "Johnson Alice", joinDate: "2023-06-15", status: "Not Active" },
    ];

    const studentData = [
        { id: "STD001", email: "Student1@gmail.com", name: "Tom Miller", joinDate: "2023-07-01", status: "Active" },
        { id: "STD002", email: "Student2@gmail.com", name: "Sarah Lee", joinDate: "2023-07-05", status: "Not Active" },
        { id: "STD003", email: "Student3@gmail.com", name: "Mark Taylor", joinDate: "2023-07-10", status: "Active" },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Active":
                return "text-blue-600 font-semibold";
            case "Pending Approval":
                return "text-yellow-500 font-semibold";
            case "Not Active":
                return "text-red-600 font-semibold";
            default:
                return "";
        }
    };
    const currentData = selectedTab === "counselors" ? counselorData : studentData;
    return (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-1 text-center">Users Management</h2>

            <div className="flex justify-center gap-4 my-6">
                <button
                    onClick={() => setSelectedTab("students")}
                    className={`px-6 py-2 rounded-full font-semibold transition duration-300 shadow-md ${selectedTab === "students"
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    Students
                </button>
                <button
                    onClick={() => setSelectedTab("counselors")}
                    className={`px-6 py-2 rounded-full font-semibold transition duration-300 shadow-md ${selectedTab === "counselors"
                            ? "bg-black text-white hover:bg-gray-900"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    Counselors
                </button>
            </div>
            <div className="overflow-x-auto rounded-xl shadow">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">{selectedTab === "students" ? "Std ID" : "Clr ID"}</th>
                            <th className=" p-3">Email</th>
                            <th className="p-3">User Name</th>
                            <th className="p-3">Join Date</th>
                            <th className=" p-3">Status</th>
                            <th className=" text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((user, idx) => (
                            <tr key={idx} className="border-t border-gray-200">
                                <td className="p-3">{user.id}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.joinDate}</td>
                                <td className={`p-3 ${getStatusStyle(user.status)}`}>{user.status}</td>
                                <td className="p-3  flex gap-2">
                                    <button className="flex items-center gap-1 bg-white border border-gray-300 px-3 py-1 rounded">
                                        <FaEye className="text-gray-600" />
                                        View
                                    </button>
                                    {user.status === "Pending Approval" ? (
                                        <button className="bg-green-700 text-white px-3 py-1 rounded">Accept</button>
                                    ) : (
                                        <button className=" bg-red-700 text-white px-3 py-1 rounded">
                                            {selectedTab === "students" ? "Remove" : "Block"}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUsers