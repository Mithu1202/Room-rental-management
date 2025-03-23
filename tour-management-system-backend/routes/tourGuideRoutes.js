const express = require("express");
const { addTourGuide, getTourGuides, getTourGuideById, updateTourGuide, deleteTourGuide } = require("../controllers/tourGuideController");

const router = express.Router();

router.post("/", addTourGuide);
router.get("/", getTourGuides);
router.get("/:id", getTourGuideById);
router.put("/:id", updateTourGuide);
router.delete("/:id", deleteTourGuide);

module.exports = router;
