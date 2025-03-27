import React, { useEffect, useState } from 'react';
import MovieCard from './Moviecard';

const Upcoming = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/getMovies'); 
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <h3 className="text-3xl font-bold mt-12 mb-12 ml-12">Top Movies</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {movies.length > 0 ? (
          movies.slice(0, 4).map((movie) => <MovieCard key={movie._id} movie={movie} />)
        ) : (
          <p className="text-white">Loading movies...</p>
        )}
      </div>
    </>
  );
};

export default Upcoming;
