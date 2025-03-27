import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, isAdmin, onDelete }) => {
  return (
    <div className="bg-white text-black p-2 rounded-lg shadow-md w-64 m-4 cursor-pointer">
      <Link to={`/MovieDetails/${movie.id}`} state={movie} className="block">
        <img 
          className="w-full h-80 object-cover rounded-lg" 
          src={movie.poster}  
          alt={movie.movieName} 
        />
        <h2 className="text-xl font-bold mt-4">{movie.movieName}</h2>
        <p className="text-purple-500 font-semibold"> {movie.language}</p>
      </Link>

      {/* Show Edit and Delete only if admin */}
      {isAdmin && (
        <div className="mt-3 flex justify-between">
          <Link 
            to={`/edit-movie/${movie.id}`} 
            className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Edit
          </Link>
          <button 
            onClick={() => onDelete(movie.id)}
            className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
