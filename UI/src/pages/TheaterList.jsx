import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MTheaterCard from "../componets/MTheaterCard";
import Nav from "../componets/Nav";

const TheaterList = () => {
  const { movieName } = useParams();
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/theaters/${movieName}`);
        if (!response.ok) throw new Error("Failed to fetch theaters");
        const data = await response.json();
        setTheaters(data); // ✅ Store theater data directly
        console.log(data)
      } catch (error) {
        console.error("Error fetching theaters:", error);
      }
    };

    fetchTheaters();
  }, [movieName]);

  return (
    <>
      <Nav />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">Theaters Showing {decodeURIComponent(movieName)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {theaters.length > 0 ? (
            theaters.map((theater, index) => (
              <MTheaterCard
                key={index}
                theater={theater.theaterName} // ✅ Use `theaterName`
                movieName={movieName}
                image={theater.image}
                 // ✅ Use `image`
              />
             
            ))
          ) : (
            <p className="text-gray-700">No theaters available for this movie.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TheaterList;
