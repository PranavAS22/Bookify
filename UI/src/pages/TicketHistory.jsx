import React, { useEffect, useState } from "react";

const TicketHistory = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/user/tickets", { credentials: "include" });
        if (!response.ok) throw new Error("Failed to fetch tickets");

        const data = await response.json();
        setTickets(data.tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (tickets.length === 0) return <p className="text-center mt-10">No ticket history available.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">Ticket History</h1>
      <div className="max-w-2xl mx-auto space-y-4">
        {tickets.map((ticket, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold text-purple-600">{ticket.movie}</h2>
            <p className="text-gray-600">{ticket.theater} - {ticket.time}</p>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Seats:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {ticket.seats.map((seat, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm">
                    {seat.seatNumber} ( ₹ {seat.price})
                  </span>
                ))}
              </div>
            </div>
            <p className="text-right mt-3 font-semibold text-gray-700">Total:  ₹{ticket.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketHistory;
