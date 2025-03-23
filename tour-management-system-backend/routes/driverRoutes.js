const express = require("express");
const { addDriver, getDrivers, getDriverById, updateDriver, deleteDriver } = require("../controllers/driverController");

const router = express.Router();

router.post("/", addDriver);
router.get("/", getDrivers);
router.get("/:id", getDriverById);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);

module.exports = router;
