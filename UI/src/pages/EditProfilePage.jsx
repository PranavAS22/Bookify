import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user/me", { credentials: "include" });
        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        console.log("User data received:", data); // Debugging

        setUser({
          username: data.user.username || data.user.userName || "", // Handle possible variations
          email: data.user.email || "",
          profilePic: data.user.profilePic || "",
        });

      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePic(reader.result); // Convert image to base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          profilePic: newProfilePic || user.profilePic,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || "Update failed");
      }

      navigate("/profile");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-md mx-auto">
        <div className="flex flex-col items-center mb-8">
          <img
            src={newProfilePic || user.profilePic || "/images/userDefault.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover"
          />
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Edit Profile</h1>
        </div>

        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="text-center">
            <input type="file" className="text-sm text-gray-700" onChange={handleFileChange} />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Username:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              value={user?.username} // Ensures controlled input
              placeholder="Enter your username" // ✅ Placeholder added
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              value={user?.email} // Ensures controlled input
              placeholder="Enter your email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600">
            Save Changes
          </button>

          <button
            type="button"
            className="w-full border-2 border-purple-500 text-purple-500 py-3 rounded-lg hover:bg-purple-50"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
