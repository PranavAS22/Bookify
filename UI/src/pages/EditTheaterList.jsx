import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditTheaterList = () => {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/theaters");
        const data = await response.json();
        setTheaters(data);
      } catch (error) {
        console.error("Error fetching theaters:", error);
      }
    };

    fetchTheaters();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Theaters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {theaters.map((theater) => (
          <div key={theater._id} className="border p-4 rounded-lg shadow-md">
            <img src={theater.image} alt={theater.theaterName} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-2">{theater.theaterName}</h3>
            <p className="text-sm text-gray-600">{theater.location}</p>
            <Link to={`/editTheater/${theater._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm mt-2">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditTheaterList;
