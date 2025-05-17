import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaSearch, FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useget } from '../../api/authapi';

const Search = () => {
  const navigate = useNavigate();
  const [counselors, setCounselors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSpecializations, setFilteredSpecializations] = useState([]);
  const [allSpecializations, setAllSpecializations] = useState([]);

  useEffect(() => {
    const GetAllCounselors = async () => {
      const response = await useget("/Councelor/all-Councelor");

      if (response?.data) {
        setCounselors(response.data);

        // Extract unique specialization tags
        const allSpecs = response.data.flatMap(c =>
          c.specialization?.split(',').map(s => s.trim())
        );
        setAllSpecializations([...new Set(allSpecs)]);
      } else {
        console.log("Error fetching counselors");
      }
    };

    GetAllCounselors();
  }, []);

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    if (keyword === '') {
      setFilteredSpecializations([]);
    } else {
      const filtered = allSpecializations.filter(spec =>
        spec.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredSpecializations(filtered);
    }
  };

  const handleSpecializationClick = async (specialization) => {
    setSearchTerm(specialization);
    setFilteredSpecializations([]);

    const response = await useget(`/Councelor/all-CouncelorByKeyword?keyword=${specialization}`);
    if (response?.data) {
      setCounselors(response.data);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5faff] px-4 py-6 mt-16">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-md text-sm font-medium"
        >
          <FaArrowLeft /> Back to Home
        </button>
      </div>

      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-[#040B57] mb-5">
        Search by Specialized Area
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-4 relative">
        <div className="flex items-center w-full max-w-2xl bg-white shadow-md border rounded-full overflow-hidden">
          <div className="px-3 text-gray-400">
            <FaSearch className="text-lg" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Eg: Psychology, Education"
            className="flex-grow px-2 py-2 text-sm outline-none text-gray-700"
          />
          <button
            onClick={() => handleSpecializationClick(searchTerm)}
            className="bg-[#3654ff] hover:bg-blue-700 text-white px-5 py-2 text-sm font-semibold"
          >
            Search
          </button>
        </div>

        {/* Filtered Specializations */}
        {filteredSpecializations.length > 0 && (
          <div className="absolute top-14 w-full max-w-2xl bg-white shadow-md rounded-md z-10 p-2 border">
            {filteredSpecializations.map((spec, index) => (
              <div
                key={index}
                onClick={() => handleSpecializationClick(spec)}
                className="cursor-pointer py-1 px-2 hover:bg-blue-100 text-sm text-gray-800"
              >
                {spec}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Counselor Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {counselors.map((x) => (
          <div
            key={x.counselors_id}
            className="bg-white rounded-lg shadow-md overflow-hidden text-sm cursor-pointer"
            onClick={() => navigate(`/details/${x.counselors_id}`)}
          >
            <img
              src={x.image_url || "https://via.placeholder.com/200x200.png?text=No+Image"}
              alt={x.full_name}
              className="w-full h-48 object-contain"
            />
            <div className="p-3">
              <h2 className="font-semibold text-lg text-[#040B57] leading-tight text-left">
                {x.full_name}
                <span className="text-gray-500 ml-1 flex items-center">
                  {Array.from({ length: Math.max(1, Math.round(x.avg_rating)) }, (_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1 text-sm" />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">({x.avg_rating.toFixed(1)})</span>
                </span>
              </h2>
              <div className="flex flex-wrap gap-1 mt-2">
                {x.specialization?.split(',').map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-[#f0f3ff] text-[#3b45a3] border border-[#3654ff] rounded-full"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm text-[#040B57] font-medium">Rate</p>
                <p className="font-bold text-[#040B57]">${x.hourly_rate}/hour</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
