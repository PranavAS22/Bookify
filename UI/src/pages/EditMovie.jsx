import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({ movieName: "", rating: "", poster: "" });

  useEffect(() => {
    fetch(`http://localhost:8000/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Movie</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={movie.movieName}
          onChange={(e) => setMovie({ ...movie, movieName: e.target.value })}
          placeholder="Movie Name"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          value={movie.rating}
          onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
          placeholder="Rating"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={movie.poster}
          onChange={(e) => setMovie({ ...movie, poster: e.target.value })}
          placeholder="Poster URL"
          className="w-full p-2 border rounded mb-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};