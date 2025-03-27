import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../componets/Nav";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <>
      <Nav />
      <div className="p-8 text-white">
        <h1 className="text-3xl font-bold">Admin Panel</h1>

        <div className="mt-6 flex flex-col gap-4">
          <button onClick={() => navigate("/addTheater")} className="p-3 bg-purple-600 hover:bg-blue-600 rounded">
            Add Theater
          </button>
          <button onClick={() => navigate("/addMovie")} className="p-3 bg-purple-600 hover:bg-blue-600 rounded">
            Add Movie
          </button>
          <button onClick={() => navigate("/addBooking")} className="p-3 bg-purple-600 hover:bg-blue-600 rounded">
            Add Booking
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
