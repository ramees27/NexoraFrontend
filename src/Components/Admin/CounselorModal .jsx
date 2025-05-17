import React from "react";

const CounselorModal = ({ data, onClose }) => {
    if (!data) return null;

    return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
  <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto p-6 md:p-10">
    
    {/* Header */}
    <div className="flex justify-between items-center mb-8 border-b pb-4">
      <h2 className="text-3xl font-bold text-gray-900">Counselor Details</h2>
      <button
        onClick={onClose}
        className="text-3xl text-gray-400 hover:text-red-500 transition"
      >
        &times;
      </button>
    </div>

    {/* Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      
      {/* Details */}
      <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
        <p><span className="font-semibold">Name:</span> {data.full_name}</p>
        <p><span className="font-semibold">Mobile:</span> {data.mobile_number}</p>
        <p><span className="font-semibold">Experience:</span> {data.experience} years</p>
        <p><span className="font-semibold">Rate:</span> ₹{data.hourly_rate}/hr</p>
        <p><span className="font-semibold">Qualification:</span> {data.qualification}</p>
        <p><span className="font-semibold">Specialization:</span> {data.specialization}</p>
        <p><span className="font-semibold">UPI ID:</span> {data.upi_id}</p>
        <p><span className="font-semibold">Join Date:</span> {new Date(data.created_at).toLocaleString("en-Gb")}</p>
      </div>

      {/* Images Section */}
      <div className="space-y-8">
        {data.image_url && (
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Profile Photo</p>
            <img
              src={data.image_url}
              alt="Profile"
              className="w-full h-[350px] object-cover rounded-xl border shadow-md"
            />
          </div>
        )}
        {data.certificate_image_url && (
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Certificate</p>
            <img
              src={data.certificate_image_url}
              alt="Certificate"
              className="w-full h-[350px] object-contain rounded-xl border shadow-md bg-gray-50"
            />
          </div>
        )}
      </div>
    </div>

    {/* Short Bio */}
    {data.short_bio && (
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Short Bio</h3>
        <p className="text-gray-600 text-[15px] leading-relaxed">{data.short_bio}</p>
      </div>
    )}
  </div>
</div>


    );
};

export default CounselorModal;
