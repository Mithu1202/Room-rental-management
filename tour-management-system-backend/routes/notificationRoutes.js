const express = require("express");
const router = express.Router();
const { sendNotification, getNotifications, deleteNotificationByAdmin } = require("../controllers/notificationController");

router.post("/send", sendNotification);
router.get("/", getNotifications);
router.delete("/:notificationId", deleteNotificationByAdmin);

module.exports = router;
