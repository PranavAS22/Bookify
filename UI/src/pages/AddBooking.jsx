import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddBooking = () => {
    const [movies, setMovies] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [movie, setMovie] = useState("");
    const [theater, setTheater] = useState("");
    const [time, setTime] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        
        fetch("http://localhost:8000/movies")
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(error => console.error("Error fetching movies:", error));

        fetch("http://localhost:8000/api/theaters")
            .then(res => res.json())
            .then(data => setTheaters(data))
            .catch(error => console.error("Error fetching theaters:", error));
    }, []);

    const handleBooking = async (e) => {
        e.preventDefault();

        const bookingData = { movie, theater, time };

        try {
            const response = await fetch("http://localhost:8000/bookings", {
                method: "POST",
        credentials: "include",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(bookingData),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Booking successful!");
                navigate("/home"); 
            } else {
                alert(result.message || "Booking failed!");
            }
        } catch (error) {
            console.error("Error adding booking:", error);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Add Booking</h2>
            <form onSubmit={handleBooking}>
                <label className="block mb-2">Movie:</label>
                <select 
                    value={movie} 
                    onChange={(e) => setMovie(e.target.value)}
                    required
                    className="w-full p-2 border rounded-md mb-4"
                >
                    <option value="">Select Movie</option>
                    {movies.map((m) => (
                        <option key={m._id} value={m.movieName}>{m.movieName}</option>
                    ))}
                </select>

                <label className="block mb-2">Theater:</label>
                <select 
                    value={theater} 
                    onChange={(e) => setTheater(e.target.value)}
                    required
                    className="w-full p-2 border rounded-md mb-4"
                >
                    <option value="">Select Theater</option>
                    {theaters.map((t) => (
                        <option key={t._id} value={t.theaterName}>{t.theaterName}</option>
                    ))}
                </select>

                <label className="block mb-2">Time:</label>
<select
    value={time}
    onChange={(e) => setTime(e.target.value)}
    required
    className="w-full p-2 border rounded-md mb-4"
>
    <option value="" disabled>Select a time</option>
    <option value="10:00 AM">10:00 AM</option>
    <option value="1:00 PM">1:00 PM</option>
    <option value="4:00 PM">4:00 PM</option>
    <option value="7:00 PM">7:00 PM</option>
    <option value="10:00 PM">10:00 PM</option>
</select>
                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">Book Now</button>
            </form>
        </div>
    );
};

export default AddBooking;
