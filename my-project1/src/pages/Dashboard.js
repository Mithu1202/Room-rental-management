import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";
import StickyHeadTable from "../components/StickyHeadTable";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([{
    role: "",
    _id: "",
    roomNo: "",
    name: "",
    email: "",
    guests: 0,
    checkInDate: "",
    periodOfStay: "",
    actions: []
}]);
  const [tourGuides, setTourGuides] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", assignedTours: "", status: "Active" });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await axios.get("http://localhost:5000/api/users/users");
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:5000/api/notifications/send"; // Assuming this is your notifications API
  
    try {
      await axios.post(apiUrl, { 
        roomNo: formData.roomNo,
        name: formData.name, 
        email: formData.email, 
        guests: formData.guests, 
        checkInDate: formData.checkInDate, 
        periodOfStay: formData.periodOfStay, 
        message: formData.message,
      });
      fetchData();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  

  const handleAdd = async (e) => {
    e.preventDefault();
    const apiUrl = activeTab === "users" ? "http://localhost:5000/api/users" : "http://localhost:5000/api/tour-guides";

    try {
      await axios.post(apiUrl, formData);
      fetchData();
      setFormData({ name: "", email: "", assignedTours: "", status: "Active" });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleSend = (item) => {
    setFormData(item);
    setEditId(item._id);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const apiUrl = activeTab === "users" ? "http://localhost:5000/api/users" : "http://localhost:5000/api/tour-guides";

    try {
      await axios.put(`${apiUrl}/${editId}`, formData);
      fetchData();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (id) => {
    const apiUrl = activeTab === "users" ? "http://localhost:5000/api/users" : "http://localhost:5000/api/tour-guides";

    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Topbar />

        <div className="p-6">
          <button onClick={() => setShowForm(true)} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md">
            ➕ Add New
          </button>
            <StickyHeadTable
            columns = {[
              { id: 'roomNo', label: 'Room No', minWidth: 100 },
              { id: 'name', label: 'Name', minWidth: 150 },
              { id: 'email', label: 'Email', minWidth: 200 },
              { id: 'guests', label: 'Guests', minWidth: 100, align: 'center' },
              { id: 'checkInDate', label: 'Check-in Date', minWidth: 150, align: 'center' },
              { id: 'periodOfStay', label: 'Period of Stay', minWidth: 150, align: 'center' },
              { id: 'actions', label: 'Actions', minWidth: 120, align: 'center' }
            ]}
            rows={users.map(user => user.role == "user" && ({
                roomNo: user.roomNo,
                name: user.name,
                email: user.email,
                guests: user.guests,
                checkInDate: user.checkInDate,
                periodOfStay: user.periodOfStay,
                actions: 
                  <div>
                    <button onClick={() => handleSend(user)} className="text-blue-600">📩</button>
                    <button onClick={() => handleDelete(user._id)} className="text-red-600">🗑️</button>
                  </div>
            })
            )}/>
        </div>
      </div>

      {/* Full-Screen Add/Edit Form Popup */}
      {(showForm || showEditModal) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{ position: "fixed", zIndex: '3' }}>
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{showForm ? `Add ${activeTab === "users" ? "Driver" : "Tour Guide"}` : `Edit ${activeTab === "users" ? "Driver" : "Tour Guide"}`}</h2>
            <form onSubmit={showForm ? handleAdd : handleSendNotification} className="flex flex-col gap-3">

              <input type="text" placeholder="Room No" value={formData.roomNo} onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })} className="border p-2 rounded-lg" required />
              <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 rounded-lg" required />
              <input type="text" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border p-2 rounded-lg" required />
              <input type="text" placeholder="Guests" value={formData.guests+' guests'} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} className="border p-2 rounded-lg" required />
              <input type="text" placeholder="Check-in Date" value={formData.checkInDate} onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })} className="border p-2 rounded-lg" required />
              <input type="text" placeholder="Period of Stay" value={formData.periodOfStay+' days'} onChange={(e) => setFormData({ ...formData, periodOfStay: e.target.value })} className="border p-2 rounded-lg" required />
              <input type="text" placeholder="Announcement Message" onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="border p-2 rounded-lg" required />
              <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg">{showForm ? "Add" : "Send"}</button>

              <button onClick={() => (showForm ? setShowForm(false) : setShowEditModal(false))} className="bg-gray-300 text-black py-2 rounded-lg">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
