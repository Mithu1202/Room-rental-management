import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData({ name: res.data.name, email: res.data.email, password: "" });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/users/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditing(false);
      setUser({ ...user, name: formData.name, email: formData.email });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#f0f0f0", padding: "20px" }}>
        <div style={{ fontWeight: "bold", padding: "10px", background: "#5A67D8", color: "white", borderRadius: "5px" }}>
          Profile Details
        </div>
        <div style={{ padding: "10px", marginTop: "10px" }}>Booking History</div>
      </div>

      {/* Profile Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <div style={{ background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>Profile Details</h2>
            {!editing && (
              <button onClick={() => setEditing(true)} style={{ color: "#5A67D8", background: "none", border: "none", cursor: "pointer" }}>
                Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleUpdate} style={{ marginTop: "10px" }}>
              <div style={{ marginBottom: "10px" }}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
              </div>
              <button type="submit" style={{ background: "#5A67D8", color: "white", padding: "8px 12px", border: "none", cursor: "pointer", borderRadius: "5px" }}>
                Save Changes
              </button>
            </form>
          ) : (
            <div style={{ marginTop: "10px" }}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
