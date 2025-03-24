const Notification = require("../models/Notification");

// @desc Create and send a new notification
exports.sendNotification = async (req, res) => {
  try {
    const { roomNo, name, email, guests, checkInDate, periodOfStay, message } = req.body;

    if (!roomNo || !name || !email || !guests || !checkInDate || !periodOfStay || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const notification = new Notification({ roomNo, name, email, guests, checkInDate, periodOfStay, message });
    await notification.save();

    res.status(201).json({ message: "Notification sent successfully", notification });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
