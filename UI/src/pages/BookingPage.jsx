import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TimeSlots from "../componets/TimeSlots";
import SeatSelection from "../componets/SeatSelection"
import Nav from "../componets/Nav";


const BookingPage = () => {
  const { movie, theater } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [showTimes, setShowTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");

  // Fetch logged-in user details
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/user/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) throw new Error("User not found");
        setUserDetails(data.user);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  // Fetch show timings for the selected movie & theater
  useEffect(() => {
    if (!movie || !theater) return;

    fetch(`http://localhost:8000/api/shows/${encodeURIComponent(movie)}/${encodeURIComponent(theater)}`)
      .then((res) => res.json())
      .then((data) => setShowTimes(data.times || []))
      .catch(() => setError("Failed to load show times"));
  }, [movie, theater]);

  // Fetch available seats for the selected time slot
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setSelectedSeats([]);
    setError("");

    fetch(`http://localhost:8000/api/seats/${encodeURIComponent(movie)}/${encodeURIComponent(theater)}/${encodeURIComponent(time)}`)
      .then((res) => res.json())
      .then((data) => setSeats(data.seats || []))
      .catch(() => setError("Failed to load seat availability"));
  };

  // Handle seat selection
  const toggleSeatSelection = (seat) => {
    if (seat.isBooked) return;
    setSelectedSeats((prev) =>
      prev.includes(seat.seatNumber)
        ? prev.filter((s) => s !== seat.seatNumber)
        : [...prev, seat.seatNumber]
    );
  };

  // Calculate total price based on selected seats
  useEffect(() => {
    setTicketPrice(
      selectedSeats.reduce((sum, seatNumber) => {
        const seat = seats.find((s) => s.seatNumber === seatNumber);
        return sum + (seat ? seat.price : 0);
      }, 0)
    );
  }, [selectedSeats, seats]);

  // Handle booking tickets
  const bookTickets = async () => {
    if (!selectedTime || selectedSeats.length === 0) {
      setError("Please select a showtime and seats");
      return;
    }
    if (!userDetails) {
      navigate("/login");
      return;
    }

    const bookingData = {
      movie,
      theater,
      time: selectedTime,
      seats: selectedSeats,
      user: userDetails._id, // ✅ Using `_id` from MongoDB
    };

    console.log("📢 Sending booking data:", bookingData);

    try {
      const response = await fetch("http://localhost:8000/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed. Please try again.");
      }

      console.log("✅ Booking success:", result);
      navigate(`/confirm?${new URLSearchParams({
        movie,
        theater,
        time: selectedTime,
        seats: selectedSeats.join(","),
        totalPrice: ticketPrice,
      }).toString()}`);
    } catch (error) {
      console.error("❌ Booking error:", error);
      setError(error.message || "Booking failed. Please try again.");
    }
  };

  return (
    <>
    <Nav />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Book Tickets for {movie}</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold mb-4">Show Timings</h2>
          <TimeSlots showTimes={showTimes} selectedTime={selectedTime} onSelectTime={handleTimeSelection} />
          <h2 className="text-lg font-semibold mt-8 mb-4">Select Seats</h2>
          <SeatSelection seats={seats} selectedSeats={selectedSeats} onSelectSeat={toggleSeatSelection} />
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Your Booking</h2>
          <p>Movie: {movie}</p>
          <p>Theater: {theater}</p>
          <p>Time: {selectedTime || "Not selected"}</p>
          <p>Seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</p>
          <p className="text-xl font-bold">Total: ₹{ticketPrice}</p>
          <button
            onClick={bookTickets}
            disabled={!selectedTime || selectedSeats.length === 0}
            className="w-full mt-4 px-6 py-3 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default BookingPage;
