import React from "react";
import { useLocation } from "react-router-dom";

const TicketPage = () => {
  const location = useLocation();
  const ticket = location.state?.ticket;

  if (!ticket) {
    return <p className="text-center text-red-500">No ticket details found!</p>;
  }

  return (
    <div className="container mx-auto p-8 text-center">
      <h2 className="text-xl font-bold mb-4">🎟️ Booking Confirmation 🎟️</h2>
      <p><strong>Movie:</strong> {ticket.movie}</p>
      <p><strong>Theater:</strong> {ticket.theater}</p>
      <p><strong>Showtime:</strong> {ticket.time}</p>
      <p><strong>Seats:</strong> {ticket.seats.map((seat) => seat.seatNumber).join(", ")}</p>
      <p className="text-red-500 font-bold"><strong>Total Price:</strong> ₹{ticket.totalPrice}</p>
    </div>
  );
};

export default TicketPage;
