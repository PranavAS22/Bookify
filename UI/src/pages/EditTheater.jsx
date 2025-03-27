import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditTheater = () => {
  const { id } = useParams(); // Get theater ID from URL
  const navigate = useNavigate();

  const [theater, setTheater] = useState({
    theaterName: "",
    location: "",
    image: null,
  });

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/theater/${id}`);
        const data = await response.json();
        setTheater(data);
      } catch (error) {
        console.error("Error fetching theater:", error);
      }
    };

    fetchTheater();
  }, [id]);

  const handleChange = (e) => {
    setTheater({ ...theater, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setTheater({ ...theater, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to update this theater?")) return;

    try {
      const response = await fetch(`http://localhost:7200/api/editTheater/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(theater),
      });

      if (!response.ok) throw new Error("Error updating theater");

      toast.success("Theater updated successfully!", { autoClose: 2000 });
      setTimeout(() => navigate("/editTheaterList"), 2000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Theater</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="theaterName"
          placeholder="Theater Name"
          className="w-full border p-2"
          value={theater.theaterName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full border p-2"
          value={theater.location}
          onChange={handleChange}
          required
        />
        <div className="border p-4 rounded-md shadow-md">
          <label className="block text-gray-700 font-bold mb-2">Upload Theater Image</label>
          <input type="file" accept="image/*" className="w-full border p-2 bg-gray-100 rounded-md" onChange={handleFileChange} />
        </div>
        {theater.image && <img src={theater.image} alt="Preview" className="w-full h-40 object-cover mt-2 rounded-md shadow-md" />}
        <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" type="submit">
          Update Theater
        </button>
      </form>
    </div>
  );
};

export default EditTheater;
