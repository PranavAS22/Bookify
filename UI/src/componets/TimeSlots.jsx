const TimeSlots = ({ showTimes, selectedTime, onSelectTime }) => {
    return (
      <div className="flex gap-4 mb-4">
        {showTimes.map((time, index) => (
          <button
            key={index}
            onClick={() => onSelectTime(time)}
            className={`p-2 border ${selectedTime === time ? "bg-purple-500 text-white" : "border-gray-500"}`}
          >
            {time}
          </button>
        ))}
      </div>
    );
  };
  
  export default TimeSlots;