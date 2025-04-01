import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/HomePage";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminNotifications from "./pages/AdminNotifications";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Router>
      <Header />
      <Routes>
        
        <Route path="/home" element={<Home />} />
        <Route path="/adminAnnouncements" element={<AdminAnnouncements />} />
        <Route path="/adminNotifications" element={<AdminNotifications />} />

      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;
