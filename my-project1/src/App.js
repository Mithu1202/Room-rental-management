import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/Dashboard";
import AdminuserManage from "./pages/AdminUserManagement";
import AdminCustomTour from "./pages/AdminCustomtour";
import Home from "./pages/HomePage";
import Book from "./pages/BookingManagement";



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
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/AdminuserManage" element={<AdminuserManage />} />
        <Route path="/AdminCustomTour" element={<AdminCustomTour />} />
        <Route path="/book" element={<Book />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
