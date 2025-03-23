const mongoose = require("mongoose");

const TourGuideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  assignedTours: [{ type: String }], // Array of tour IDs or names
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

module.exports = mongoose.model("TourGuide", TourGuideSchema);
