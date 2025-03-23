// routes/tourRequestRoutes.js
const express = require('express');
const router = express.Router();
const { getAllTourRequests, updateTourRequest, deleteTourRequest, createTourRequest } = require('../controllers/tourRequestController');

// Route to get all tour requests
router.get('/tour-requests', getAllTourRequests);

// Route to create a new tour request
router.post('/tour-requests', createTourRequest);

// Route to update a tour request
router.put('/tour-requests/:tourRequestId', updateTourRequest);

// Route to delete a tour request
router.delete('/tour-requests/:tourRequestId', deleteTourRequest);

module.exports = router;
