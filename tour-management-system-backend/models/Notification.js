const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  guests: { type: String, required: true },
  checkInDate: { type: String, required: true },
  periodOfStay: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("Notification", NotificationSchema);
