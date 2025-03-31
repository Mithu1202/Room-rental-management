const express = require("express");
const {
  getAllUsers, 
  updateUserByAdmin, 
  deleteUserByAdmin 
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", getAllUsers);
router.put("/user/:userId", updateUserByAdmin);
router.delete("/user/:userId", deleteUserByAdmin);

module.exports = router;
