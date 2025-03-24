const Notification = require("../models/Notification");
const sendEmail = require("../utils/emailService");
const mailTemplate = require("../views/mailTemplate");

const sendNotification = async (req, res) => {
  try {
    const { roomNo, name, email, guests, checkInDate, periodOfStay, message } = req.body;

    if (!roomNo || !name || !email || !guests || !checkInDate || !periodOfStay || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const emailSubject = "Room Booking Notification";
    
    await sendEmail(email, emailSubject, mailTemplate(name, roomNo, guests, checkInDate, periodOfStay, message));

    const notification = new Notification({ roomNo, name, email, guests, checkInDate, periodOfStay, message });
    await notification.save();

    res.status(201).json({ message: "Notification sent successfully", notification });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({role:'user'});
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    sendNotification,
    getNotifications,
};