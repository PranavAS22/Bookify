import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTheater = () => {
  const navigate = useNavigate();
  const [theater, setTheater] = useState({
    theaterName: "",
    location: "",
    image: null, // Base64 Image
  });

  const handleChange = (e) => {
    setTheater({ ...theater, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setTheater({ ...theater, image: reader.result }); // Convert to Base64
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to add this theater?")) return;

    try {
      const response = await fetch("http://localhost:8000/api/addTheater", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Needed if using authentication
        body: JSON.stringify(theater),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Error adding theater");
      }

      toast.success("Theater added successfully!", { autoClose: 2000 });
      alert("Theater added successfully!"); // Added alert here
      setTimeout(() => navigate("/home"), 2000);

      setTheater({ theaterName: "", location: "", image: null });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Add Theater</h2>
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

        {theater.image && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">Preview:</p>
            <img src={theater.image} alt="Preview" className="w-full h-40 object-cover mt-2 rounded-md shadow-md" />
          </div>
        )}

        <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" type="submit">
          Add Theater
        </button>
      </form>
    </div>
  );
};

export default AddTheater;
