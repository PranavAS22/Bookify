import React from "react";

const TheaterCard = ({ theater }) => {
  return (
    <div className="bg-white text-black p-2 rounded-lg shadow-md w-64 m-4 cursor-pointer">
      <img
        className="w-full h-40 object-cover rounded-lg"
        src={theater.image}  
        alt={theater.theaterName}
        onError={(e) => (e.target.src = "/default-theater.jpg")}
      />
      <h2 className="text-xl font-bold mt-4">{theater.theaterName}</h2>
      <p className="text-purple-500 font-semibold">{theater.location}</p>
    </div>
  );
};

export default TheaterCard;
