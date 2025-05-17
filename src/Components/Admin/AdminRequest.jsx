import React, { useEffect, useState } from 'react'
import { useget, usePatch } from '../../api/authapi';
import CounselorModal from './CounselorModal ';
import axios from 'axios';

const AdminRequest = () => {
   const[pending,setPending]=useState([]);
const [showModal, setShowModal] = useState(false);
const [selectedCounselor, setSelectedCounselor] = useState(null);
   const getPendingRequest=async()=>{

    try{
      const response= await useget("/DashBoard/Get-nonverified-CouncelorsDetails");
      setPending(response.data)
    
    
      
    }
    catch(error){
      console.log(error);
      
    }
  }
  const rejectCouncelor=async(id)=>{
    try{
    const response= await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/DashBoard/counselor/application/${id}`);
 
    getPendingRequest();
    }
    catch(error){
      console.log(error);
      
    }
  }



   const verifyCouncelor=async(id)=>{
    try{
    const response= await usePatch(`/DashBoard/Concelor-Verification?councelorId=${id}`);
   
    getPendingRequest();
    }
    catch(error){
      console.log(error);
      
    }
  }


  useEffect(()=>{
getPendingRequest();
  },[])
  return (
    <div className="p-4 md:p-8">
  <div className="mb-4">
    <h2 className="text-xl font-semibold">Pending Approvals</h2>
    <p className="text-sm text-gray-500">New counselor applications awaiting approval</p>
  </div>

  <div className="bg-white shadow rounded-lg overflow-x-auto">
    <div className="flex justify-between items-center px-4 py-2 border-b">
      <h3 className="text-md font-semibold">Counselors Applications ({pending?.length || 0})</h3>
    </div>

    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="px-4 py-2">Counselor ID</th>
          <th className="px-4 py-2">Counselor Full Name</th>
          <th className="px-4 py-2">Contact Number</th>
          <th className="px-4 py-2">Submitted Date</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {pending && pending.length > 0 ? (
          pending.map((app, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{app.counselors_id}</td>
              <td className="px-4 py-3">{app.full_name}</td>
              <td className="px-4 py-3">{app.mobile_number}</td>
              <td className="px-4 py-3">{new Date(app.created_at).toLocaleDateString("en-GB")}</td>
              <td className="px-4 py-3 space-x-2">
                <button
                  className="bg-white border px-3 py-1 rounded shadow-sm hover:bg-gray-100"
                  onClick={() => {
                    setSelectedCounselor(app);
                    setShowModal(true);
                  }}
                >
                  View
                </button>

                {showModal && (
                  <CounselorModal data={selectedCounselor} onClose={() => setShowModal(false)} />
                )}
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  onClick={() => verifyCouncelor(app.counselors_id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => rejectCouncelor(app.counselors_id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center text-gray-500 py-6">
              No new counselor requests
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default AdminRequest
