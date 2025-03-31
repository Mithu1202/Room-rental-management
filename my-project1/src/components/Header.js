import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between">
      <h1 className="text-xl font-bold text-blue-700">Rent Nest</h1>
        <nav>
          <Link to="/home" className="mr-4">Home</Link>
          <Link to="/adminAnnouncements" className="mr-4">Admin</Link>
        </nav>
    </header>
  );
};

export default Header;
