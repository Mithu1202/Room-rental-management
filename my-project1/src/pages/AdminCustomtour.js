import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";

const AdminDashboard = () => {
  const [tourRequests, setTourRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [updateRequest, setUpdateRequest] = useState(null);

  useEffect(() => {
    fetchTourRequests();
  }, []);

  const fetchTourRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tour-requests/tour-requests");
      setTourRequests(response.data);
    } catch (error) {
      console.error("Error fetching tour requests:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/tour-requests/tour-requests/${id}`, { status });
      fetchTourRequests();
      setUpdateRequest(null);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tour-requests/tour-requests/${id}`);
      fetchTourRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Custom Tour Requests</h2>

          {/* Data Table */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-6 font-semibold pb-2 border-b border-gray-300">
              <span>Email</span>
              <span>Group Size</span>
              <span>Budget</span>
              <span>Status</span>
              <span>Actions</span>
              <span>Manage</span>
            </div>

            {tourRequests.map((request) => (
              <div key={request._id} className="grid grid-cols-6 py-2 border-b border-gray-100 items-center">
                <span>{request.contactEmail}</span>
                <span>{request.groupSize} people</span>
                <span>${request.budget}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  request.status === "Pending" ? "bg-yellow-200 text-yellow-700" :
                  request.status === "Approved" ? "bg-green-200 text-green-700" :
                  "bg-red-200 text-red-700"
                }`}>
                  {request.status}
                </span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setExpandedRequest(request)} 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
                  >
                    View Details
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setUpdateRequest(request)} 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                  >
                    Update Status
                  </button>
                  <button 
                    onClick={() => deleteRequest(request._id)} 
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Screen Tour Request Details Popup */}
      {expandedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Tour Request Details</h2>
            <div className="flex flex-col gap-3">
              <p><strong>Email:</strong> {expandedRequest.contactEmail}</p>
              <p><strong>Group Size:</strong> {expandedRequest.groupSize} people</p>
              <p><strong>Budget Per Person:</strong> ${expandedRequest.budget}</p>
              <p><strong>Start Date:</strong> {expandedRequest.startDate}</p>
              <p><strong>End Date:</strong> {expandedRequest.endDate}</p>
              <p><strong>Preferred Hotels:</strong> {expandedRequest.preferredHotels?.join(", ")}</p>
              <p><strong>Meal Preference:</strong> {expandedRequest.mealPreference}</p>
              <p><strong>Special Requirements:</strong> {expandedRequest.specialRequirements}</p>
              <p><strong>Phone:</strong> {expandedRequest.contactNo}</p>
              <p><strong>Status:</strong> {expandedRequest.status}</p>

              <button 
                onClick={() => setExpandedRequest(null)}
                className="bg-gray-300 text-black py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Popup */}
      {updateRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Update Status</h2>
            <div className="flex flex-col gap-3">
              <p><strong>Group Size:</strong> {updateRequest.groupSize} people</p>
              <p><strong>Budget Per Person:</strong> ${updateRequest.budget}</p>
              <p><strong>Start Date:</strong> {updateRequest.startDate}</p>
              <p><strong>End Date:</strong> {updateRequest.endDate}</p>
              <p><strong>Preferred Hotels:</strong> {updateRequest.preferredHotels?.join(", ")}</p>
              <p><strong>Meal Preference:</strong> {updateRequest.mealPreference}</p>
              <p><strong>Special Requirements:</strong> {updateRequest.specialRequirements}</p>
              <p><strong>Contact Email:</strong> {updateRequest.contactEmail}</p>
              <p><strong>Phone:</strong> {updateRequest.contactNo}</p>

              <div className="flex justify-between">
                <button 
                  onClick={() => updateStatus(updateRequest._id, "Pending")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                >
                  Pending
                </button>
                <button 
                  onClick={() => updateStatus(updateRequest._id, "Approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                >
                  Approve
                </button>
                <button 
                  onClick={() => updateStatus(updateRequest._id, "Cancelled")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                >
                  Cancelled
                </button>
              </div>

              <button 
                onClick={() => setUpdateRequest(null)}
                className="mt-3 bg-gray-300 text-black py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
