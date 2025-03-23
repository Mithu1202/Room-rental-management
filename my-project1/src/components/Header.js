import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token on logout
    localStorage.removeItem("user"); // Clear user data if stored
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between">
      <h1 className="text-xl font-bold text-blue-700">Serene  Tours</h1>
      <nav>
      <Link to="/home" className="mr-4">Home</Link>

        <Link to="/tours" className="mr-4">Tours</Link>

        {token ? (
          <>
            <Link to="/profile" className="mr-4">Profile</Link>
            <button onClick={handleLogout} className="text-red-500">Logout</button>
          </>
        ) : (
          <Link to="/login" className="mr-4">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
