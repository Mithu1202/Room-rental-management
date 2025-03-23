const Driver = require("../models/Driver");

// Add a Driver
const addDriver = async (req, res) => {
  try {
    const { name, contactInfo, assignedTours, status } = req.body;

    const driver = new Driver({ name, contactInfo, assignedTours, status });
    await driver.save();

    res.status(201).json({ message: "Driver added successfully", driver });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Drivers
const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a Single Driver
const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a Driver
const updateDriver = async (req, res) => {
  try {
    const { name, contactInfo, assignedTours, status } = req.body;
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    driver.name = name || driver.name;
    driver.contactInfo = contactInfo || driver.contactInfo;
    driver.assignedTours = assignedTours || driver.assignedTours;
    driver.status = status || driver.status;

    await driver.save();
    res.json({ message: "Driver updated successfully", driver });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a Driver
const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    await driver.deleteOne();
    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addDriver, getDrivers, getDriverById, updateDriver, deleteDriver };
