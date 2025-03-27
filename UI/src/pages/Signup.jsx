// Signup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultpic from '../images/userDefault.png'; // Import your default image

const Signup = () => {
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const navigate = useNavigate();

  // Convert default image to Base64 on component mount
  useEffect(() => {
    const convertImageToBase64 = async () => {
      const response = await fetch(defaultpic);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        setProfilePic(reader.result); // Set Base64 string
      };
    };
    convertImageToBase64();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        credentials: 'include', // For cookies if needed
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userName, password, profilePic }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Signup failed");
  
      // Redirect to login page after successful signup
      navigate('/login'); 
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">Sign Up</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Username:</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-purple-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;