import React from 'react'
import { FiEye } from "react-icons/fi";

const Complaint = () => {
    const complaintsData = [
        {
          cmpId: "SES002",
          sectionId: "SES002",
          date: "2023-06-15",
          complainant: "Johnson Alice",
          subject: "Video call issues",
          status: "New"
        },
        {
          cmpId: "SES003",
          sectionId: "SES002",
          date: "2023-06-15",
          complainant: "Johnson Alice",
          subject: "Can't join",
          status: "In Progress"
        },
        {
          cmpId: "SES003",
          sectionId: "SES002",
          date: "2023-06-15",
          complainant: "Johnson Alice",
          subject: "Session Expired",
          status: "Resolved"
        }
      ];
      const StatusBadge = ({ status }) => {
        const base = "px-2 py-1 text-xs font-semibold rounded-full";
        const style =
          status === "New"
            ? "bg-pink-100 text-pink-800"
            : status === "In Progress"
            ? "bg-orange-100 text-orange-800"
            : status === "Resolved"
            ? "bg-blue-100 text-blue-800"
            : "";
      
        return <span className={`${base} ${style}`}>{status}</span>;
      };
      
      
  return (
    <div className="p-6 space-y-4">
    <h3 className="text-2xl font-bold text-center">Complaints Management</h3>
    <p className="text-center text-gray-600">View and handle user complaints</p>
    <div className="overflow-x-auto">
      <table className="min-w-full mt-4 border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Cmp ID</th>
            <th className="px-4 py-2 border">Seccion Id</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Complainant</th>
            <th className="px-4 py-2 border">Subject</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaintsData.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="px-4 py-2 border">{item.cmpId}</td>
              <td className="px-4 py-2 border">{item.sectionId}</td>
              <td className="px-4 py-2 border">{item.date}</td>
              <td className="px-4 py-2 border">{item.complainant}</td>
              <td className="px-4 py-2 border">{item.subject}</td>
              <td className="px-4 py-2 border">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-4 py-2 border">
                <FiEye className="inline-block" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Complaint