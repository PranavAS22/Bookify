import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMovie = () => {
  const navigate = useNavigate();
  const [movieName, setMovieName] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState(null);
  const [language, setLanguage] = useState("");
  const [cast, setCast] = useState("");
  const [director, setDirector] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPoster(reader.result); // Store as Base64
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to add this movie?")) {
      return;
    }

    try {
      const movieData = {
        movieName,
        genre,
        duration,
        releaseDate,
        description,
        language,
        cast,
        director,
        poster, // Base64 Image
      };

      const response = await fetch("http://localhost:8000/api/addMovie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error("Error adding movie");
      }

      toast.success("Movie added successfully!", { autoClose: 2000 });
      setTimeout(() => navigate("/home"), 2000);

      setMovieName("");
      setGenre("");
      setDuration("");
      setReleaseDate("");
      setDescription("");
      setPoster(null);
      setLanguage("");
      setCast("");
      setDirector("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Add Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Movie Name" className="w-full border p-2" value={movieName} onChange={(e) => setMovieName(e.target.value)} required />
        <input type="text" placeholder="Genre (e.g., Action, Drama)" className="w-full border p-2" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        <input type="text" placeholder="Duration (e.g., 2h 30m)" className="w-full border p-2" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        <input type="date" className="w-full border p-2" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
        <textarea placeholder="Description" className="w-full border p-2" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Language (e.g., English, Hindi)" className="w-full border p-2" value={language} onChange={(e) => setLanguage(e.target.value)} required />
        <input type="text" placeholder="Cast (comma separated)" className="w-full border p-2" value={cast} onChange={(e) => setCast(e.target.value)} required />
        <input type="text" placeholder="Director" className="w-full border p-2" value={director} onChange={(e) => setDirector(e.target.value)} required />

        <div className="border p-4 rounded-md shadow-md">
          <label className="block text-gray-700 font-bold mb-2">Upload Poster</label>
          <input type="file" accept="image/*" className="w-full border p-2 bg-gray-100 rounded-md" onChange={handleFileChange} />
        </div>

        {poster && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">Preview:</p>
            <img src={poster} alt="Preview" className="w-full h-40 object-cover mt-2 rounded-md shadow-md" />
          </div>
        )}

        <button className="bg-purple-500 text-white px-4 py-2 rounded" type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
