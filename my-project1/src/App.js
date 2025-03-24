import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CustomerDashboard from "./pages/CustomerDashboard";
import Home from "./pages/HomePage";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminNotifications from "./pages/AdminNotifications";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/adminAnnouncements" element={<AdminAnnouncements />} />
        <Route path="/adminNotifications" element={<AdminNotifications />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
