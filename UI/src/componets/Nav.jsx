import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-white text-purple-600 p-4 flex items-center justify-between">
      <h1 className="text-3xl font-bold">Bookify</h1>

      <div className="mt-4 sm:hidden md:block">
        <Link to="/home" className="m-4 p-3 hover:bg-purple-600 font-bold hover:text-white">Home</Link>
        <Link to="/movie" className="m-4 p-3 font-bold hover:bg-purple-600 hover:text-white">Movies</Link>
        <Link to="/Teather" className="m-4 p-3 font-bold hover:bg-purple-600 hover:text-white">Theaters</Link>
      </div>

      <div className="m-4 sm:hidden md:block">
        <Link to="/profile">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
