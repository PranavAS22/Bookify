const SeatSelection = ({ seats, selectedSeats, onSelectSeat }) => {
    return (
      <div className="grid grid-cols-6 gap-2">
        {seats.map((seat) => (
          <button
            key={seat.seatNumber}
            onClick={() => onSelectSeat(seat)}
            disabled={seat.isBooked}
            className={`p-2 border ${
              seat.isBooked
                ? "bg-gray-300 cursor-not-allowed"
                : selectedSeats.includes(seat.seatNumber)
                ? "bg-purple-500 text-white"
                : "border-purple-500"
            }`}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>
    );
  };
  
  export default SeatSelection;