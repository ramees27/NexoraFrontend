import { FaTimes } from "react-icons/fa";

const CounselorProfileModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-xl relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">Counselor Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <p><strong>Full Name:</strong> {data.full_name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Phone:</strong> {data.mobile_number}</p>
            <p><strong>Qualification:</strong> {data.qualification}</p>
            <p><strong>Specialization:</strong> {data.specialization}</p>
            <p><strong>Experience:</strong> {data.experience} years</p>
            <p><strong>Hourly Rate:</strong> ₹{data.hourly_rate}</p>
            <p><strong>UPI ID:</strong> {data.upi_id}</p>
            <p><strong>Join Date:</strong> {new Date(data.created_at).toLocaleDateString("en-GB")}</p>
            <p><strong>Average Rating:</strong> {data.avg_rating}</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Profile Image:</p>
              {data.image_url ? (
                <img src={data.image_url} alt="Profile" className="w-40 h-40 object-cover rounded" />
              ) : (
                <p className="text-gray-500">No image available</p>
              )}
            </div>

            <div>
              <p className="font-semibold mb-2">Certificate:</p>
              <img src={data.certificate_image_url} alt="Certificate" className="w-40 h-auto border rounded" />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold mb-2">Short Bio:</p>
          <p className="text-gray-700 whitespace-pre-line">{data.short_bio}</p>
        </div>
      </div>
    </div>
  );
};

export default CounselorProfileModal;
