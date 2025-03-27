import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract ticket data from query parameters
  const queryParams = new URLSearchParams(location.search);
  const movie = queryParams.get("movie");
  const theater = queryParams.get("theater");
  const time = queryParams.get("time");
  const seats = queryParams.get("seats");
  const totalPrice = queryParams.get("totalPrice");

  // Handle missing or invalid data
  if (!movie || !theater || !time || !seats || !totalPrice) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-6">Invalid Booking Data</h1>
          <p className="text-lg mb-6">
            The booking information is missing or incomplete. Please try again.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="mt-8 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Split seats into an array
  const seatsArray = seats.split(",");

  const handleDone = () => {
    navigate("/home"); // Redirect to home page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">Booking Confirmed!</h1>
        <div className="space-y-4 text-left">
          <p className="text-lg">
            <strong className="font-semibold">Movie:</strong> {movie}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Theater:</strong> {theater}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Time:</strong> {time}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Seats:</strong> {seatsArray.join(", ")}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Total Price:</strong> ₹{totalPrice}
          </p>
        </div>
        <button
          onClick={handleDone}
          className="mt-8 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ConfirmPage;