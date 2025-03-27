import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
 import TheaterCard from "./TheaterCard";

const TheaterGrid = () => {
  const [theaters, setTheaters] = useState([]);
  const { movieName } = useParams();

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await fetch("/api/getTheaters"); 
        if (!response.ok) throw new Error("Failed to fetch theaters");
        const data = await response.json();
        setTheaters(data);
      } catch (error) {
        console.error("Error fetching theaters:", error);
      }
    };

    fetchTheaters();
  }, []);

  return (
    <>
      <h3 className="text-3xl font-bold mt-12 mb-12 ml-12 text-white">Theaters for {movieName}</h3>
      <div className="flex flex-wrap gap-6 justify-center">
        {theaters.length > 0 ? (
          theaters.map((theater) => <TheaterCard key={theater._id} theater={theater} />)
        ) : (
          <p className="text-white">Loading theaters...</p>
        )}
      </div>
    </>
  );
};

export default TheaterGrid;
