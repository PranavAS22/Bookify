import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Reviews from "../componets/Reviews";
import Nav from "../componets/Nav";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const movie = location.state;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movie) {
      setError("Movie data not found");
    }
    setLoading(false);
  }, [movie]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <>
    <Nav />

    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <img
          className="w-64 h-96 object-cover rounded-lg"
          src={movie.poster}
          alt={movie.movieName}
        />

        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{movie.movieName}</h2>
          
          <div className="flex items-center gap-4 mb-4">
          
            <span className="text-gray-600">
              {new Date(movie.releaseDate).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-700 mb-4">{movie.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600">Genre</p>
              <p className="font-medium">{movie.genre}</p>
            </div>
            <div>
              <p className="text-gray-600">Language</p>
              <p className="font-medium">{movie.language}</p>
            </div>
            <div>
              <p className="text-gray-600">Duration</p>
              <p className="font-medium">{movie.duration}</p>
            </div>
            <div>
              <p className="text-gray-600">Director</p>
              <p className="font-medium">{movie.director}</p>
            </div>
          </div>

          <Link 
            to={`/theater-list/${encodeURIComponent(movie.movieName)}`}
            className="inline-block bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Book Tickets
          </Link>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Cast</h3>
        <div className="flex flex-wrap gap-2">
          {movie.cast.map((actor, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full">
              {actor}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <Reviews movieName={movie.movieName} />
      </div>
    </div>
    </>
  );
};

export default MovieDetails;