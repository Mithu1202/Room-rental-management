const express = require("express");
const { 
  registerUser, 
  loginUser, 
  updateUserProfile, 
  getUserProfile, 
  getAllUsers, 
  updateUserByAdmin, 
  deleteUserByAdmin 
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (user profile management)
router.put("/profile", authMiddleware, updateUserProfile);
router.get("/profile", authMiddleware, getUserProfile);

// Admin-only routes
router.get("/users", getAllUsers);
router.put("/user/:userId", updateUserByAdmin);
router.delete("/user/:userId", deleteUserByAdmin);

module.exports = router;
