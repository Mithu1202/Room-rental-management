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
router.put("/profile", authMiddleware, updateUserProfile); // Update user profile
router.get("/profile", authMiddleware, getUserProfile); // Get user profile

// Admin-only routes (for admin management of users)
router.get("/users", getAllUsers); // Admin - Get all users
router.put("/user/:userId", updateUserByAdmin); // Admin - Update user
router.delete("/user/:userId",deleteUserByAdmin); // Admin - Delete user

module.exports = router;
