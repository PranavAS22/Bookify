import React from "react";
import { Link } from "react-router-dom";

const MTheaterCard = ({ theater, movieName, image }) => {
  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-md">
      <img
        src={image} // ✅ Correct image path
        alt={theater}
        className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-xl font-bold mt-2">{theater}</h3>
      <Link to={`/book/${theater}/${encodeURIComponent(movieName)}`}>

        <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          Book Now
        </button>
      </Link>
    </div>
  );
};

export default MTheaterCard;
