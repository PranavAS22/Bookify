import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
          const response = await fetch("http://localhost:8000/api/user/me", {
              credentials: "include", // Ensures cookies are sent
          });
  
          if (!response.ok) throw new Error("Failed to fetch user");
  
          const data = await response.json();
          setUser(data.user);
      } catch (error) {
          console.error("Error fetching user:", error);
          navigate("/login");
      }
  };
  

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-md mx-auto">
        <div className="flex flex-col items-center mb-8">
          <img 
            src={user.profilePic}
               
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 border-4 border-purple-500 object-cover"
            onError={(e) => {
              e.target.src = "/images/userDefault.png";
            }}
          />
          <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
        </div>

        <div className="space-y-4">
          <button
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>

          <button
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
            onClick={() => navigate("/ticket-history")}
          >
            View Ticket History
          </button>

          {user.role === "admin" && (
            <button
              className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
              onClick={() => navigate("/admin")}
            >
              Admin Panel
            </button>
          )}

          <button
            className="w-full border-2 border-purple-500 text-purple-500 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;