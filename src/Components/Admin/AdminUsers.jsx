import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { useget } from '../../api/authapi';
import CounselorProfileModal from './CounselorProfileModal';

const AdminUsers = () => {
    const [selectedTab, setSelectedTab] = useState("counselors");
    const [conselorData, setCouncelorData] = useState([]);
    const [studentData, setStudentData] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedCounselor, setSelectedCounselor] = useState(null);

    const getAllCouncelors = async () => {
        try {
            const response = await useget("/AdminUser/admin/Councelors")
            setCouncelorData(response.data)
            console.log(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    const getAllStudents = async () => {
        try {
            const response = await useget("/AdminUser/admin/students")
            setStudentData(response.data)
             console.log(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCouncelors()
        getAllStudents()
    }, [])

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

    const currentData = selectedTab === "counselors" ? conselorData : studentData;

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
                            <th className="p-3">Email</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Join Date</th>
                            {selectedTab !== "students" && <th className="p-3">Status</th>}
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((user, idx) => (
                            <tr key={idx} className="border-t border-gray-200">
                                <td className="p-3">
                                    {selectedTab === "students" ? user.userId : user.counselors_id}
                                </td>
                                <td className="p-3">
                                    {selectedTab === "students" ? user.userEmail : user.email || "—"}
                                </td>
                                <td className="p-3">
                                    {selectedTab === "students" ? user.userName : user.full_name}
                                </td>
                                <td className="p-3">
                                    {new Date(user.created_at).toLocaleDateString("en-GB")}
                                </td>
                                {selectedTab !== "students" && (
                                    <td className={`p-3 ${getStatusStyle(user.is_verified ? "Active" : "Pending Approval")}`}>
                                        {user.is_verified ? "Active" : "Pending Approval"}
                                    </td>
                                )}
                                <td className="p-3 flex gap-2">
                                    <button
                                        className="flex items-center gap-1 bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
                                        onClick={() => {
                                            setSelectedCounselor(user);
                                            setShowModal(true);
                                        }}
                                    >
                                        <FaEye className="text-gray-600" />
                                        View
                                    </button>



                                    {user.is_deleted ? (
                                        <button className="bg-green-700 text-white px-3 py-1 rounded">
                                            Unblock
                                        </button>
                                    ) : user.is_verified === false && selectedTab !== "students" ? (
                                        <>
                                            <button className="bg-green-700 text-white px-3 py-1 rounded">Accept</button>
                                            <button className="bg-red-700 text-white px-3 py-1 rounded">Reject</button>
                                        </>
                                    ) : (
                                        <button className="bg-red-700 text-white px-3 py-1 rounded">
                                            {selectedTab === "students" ? "Remove" : "Block"}
                                        </button>
                                    )}
                                    {showModal && selectedCounselor && (
                                        <CounselorProfileModal data={selectedCounselor} onClose={() => setShowModal(false)} />
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

export default AdminUsers;
