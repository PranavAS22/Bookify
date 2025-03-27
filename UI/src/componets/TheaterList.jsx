import { Link } from "react-router-dom";

const TheaterList = ({ theaters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {theaters.map((theater) => (
        <div key={theater._id} className="border p-4 rounded-lg shadow-md">
          <img src={theater.image} alt={theater.theaterName} className="w-full h-40 object-cover rounded-md" />
          <h3 className="text-lg font-bold mt-2">{theater.theaterName}</h3>
          <p className="text-sm text-gray-600">{theater.location}</p>

          <div className="mt-3 flex justify-between">
            <Link to={`/editTheater/${theater._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TheaterList;
