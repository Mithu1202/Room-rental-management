import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";
import StickyHeadTable from "../components/StickyHeadTable";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", role: "user", password: "" });
  const [editId, setEditId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const notificationRes = await axios.get("http://localhost:5000/api/notifications");
      setNotifications(notificationRes.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, email: item.email, role: item.role, password: "" });
    setEditId(item._id);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Prepare the data to update, include password only if it's not empty
      const updateData = { ...formData };
      if (!formData.password) {
        delete updateData.password; // Do not send password if not updated
      }

      await axios.put(`http://localhost:5000/api/users/user/${editId}`, updateData);
      fetchData();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/user/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Topbar />

        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-6 mb-6">
            <span
              onClick={() => setActiveTab("notifications")}
              className={`cursor-pointer pb-2 border-b-2 ${activeTab === "notifications" ? "border-black font-bold" : "text-gray-500"}`}
            >
              Admin User Management
            </span>
          </div>
          <StickyHeadTable
            columns = {[
              { id: 'roomNo', label: 'Room No', minWidth: 100 },
              { id: 'name', label: 'Name', minWidth: 150 },
              { id: 'email', label: 'Email', minWidth: 200 },
              { id: 'guests', label: 'Guests', minWidth: 100, align: 'center' },
              { id: 'checkInDate', label: 'Check-in Date', minWidth: 150, align: 'center' },
              { id: 'periodOfStay', label: 'Period of Stay', minWidth: 150, align: 'center' },
              { id: 'message', label: 'message', minWidth: 150, align: 'center' },
              { id: 'actions', label: 'Actions', minWidth: 120, align: 'center' }
            ]}
            rows={notifications.map(user => user.role == "user" && ({
                roomNo: user.roomNo,
                name: user.name,
                email: user.email,
                guests: user.guests,
                checkInDate: user.checkInDate,
                periodOfStay: user.periodOfStay,
                message: user.message,
                actions: 
                  <div style={{display:"flex", gap:"15px", justifyContent:"center"}}>
                    <button onClick={() => handleDelete(user._id)} className="text-red-600"><i class="fa fa-trash" aria-hidden="true"></i></button>
                  </div>
            }))}
          />
        </div>
      </div>

      {/* Full-Screen Edit Form Popup */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border p-2 rounded-lg"
                required
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="border p-2 rounded-lg"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <input
                type="password"
                placeholder="Change Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border p-2 rounded-lg"
              />
              <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg">
                Update User
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 text-black py-2 rounded-lg"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
