import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      alert("Login Successful");

      if (data.user.role === "admin") {
        navigate("/adminAnnouncements");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 via-blue-300 to-indigo-500">
      <div className="relative w-full max-w-md p-8 bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30">
        <h2 className="text-4xl font-extrabold text-white text-center mb-6">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-white/60 outline-none"
            />
            <i className="absolute right-4 top-3 text-white opacity-70 fa fa-envelope"></i>
          </div>
          
          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-white/60 outline-none"
            />
            <i className="absolute right-4 top-3 text-white opacity-70 fa fa-lock"></i>
          </div>
          
          {/* Login Button */}
          <button className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-50 transition-all duration-300">
            Login
          </button>
        </form>
        
        {/* Sign Up Link */}
        <p className="mt-4 text-center text-white/80 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-white font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>

  );
};

export default Login;
