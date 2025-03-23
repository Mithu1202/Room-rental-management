// controllers/tourRequestController.js
const TourRequest = require('../models/TourRequest');

// Get all tour requests
const getAllTourRequests = async (req, res) => {
  try {
    const tourRequests = await TourRequest.find();
    res.json(tourRequests);
  } catch (error) {
    console.error("Error fetching tour requests:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new tour request
const createTourRequest = async (req, res) => {
  try {
    const { groupSize, budget, startDate, endDate, preferredHotels, mealPreference, specialRequirements, contactEmail, contactNo, status } = req.body;

    // Validate required fields
    if (!groupSize || !budget || !startDate || !endDate || !preferredHotels || !contactEmail || !contactNo) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Create a new TourRequest document
    const newTourRequest = new TourRequest({
      groupSize,
      budget,
      startDate,
      endDate,
      preferredHotels,
      mealPreference,
      specialRequirements,
      contactEmail,
      contactNo,
      status: status || 'Pending'  // Default to 'Pending' if no status is provided
    });

    // Save the new tour request to the database
    await newTourRequest.save();
    res.status(201).json({ message: "Tour request created successfully", newTourRequest });
  } catch (error) {
    console.error("Error creating tour request:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a tour request by ID
const updateTourRequest = async (req, res) => {
  try {
    const { tourRequestId } = req.params; // tourRequestId from URL
    const { groupSize, budget, startDate, endDate, preferredHotels, mealPreference, specialRequirements, contactEmail, contactNo, status } = req.body;

    const tourRequest = await TourRequest.findById(tourRequestId);
    if (!tourRequest) return res.status(404).json({ message: "Tour request not found" });

    if (groupSize) tourRequest.groupSize = groupSize;
    if (budget) tourRequest.budget = budget;
    if (startDate) tourRequest.startDate = startDate;
    if (endDate) tourRequest.endDate = endDate;
    if (preferredHotels) tourRequest.preferredHotels = preferredHotels;
    if (mealPreference) tourRequest.mealPreference = mealPreference;
    if (specialRequirements) tourRequest.specialRequirements = specialRequirements;
    if (contactEmail) tourRequest.contactEmail = contactEmail;
    if (contactNo) tourRequest.contactNo = contactNo;
    if (status) tourRequest.status = status;  // Update the status

    await tourRequest.save();
    res.json({ message: "Tour request updated successfully", tourRequest });
  } catch (error) {
    console.error("Error updating tour request:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a tour request by ID
const deleteTourRequest = async (req, res) => {
  try {
    const { tourRequestId } = req.params; // tourRequestId from URL

    const tourRequest = await TourRequest.findById(tourRequestId);
    if (!tourRequest) return res.status(404).json({ message: "Tour request not found" });

    await tourRequest.remove();
    res.json({ message: "Tour request deleted successfully" });
  } catch (error) {
    console.error("Error deleting tour request:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllTourRequests, createTourRequest, updateTourRequest, deleteTourRequest };
