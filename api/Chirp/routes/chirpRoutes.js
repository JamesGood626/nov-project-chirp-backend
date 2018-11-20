const express = require('express');
const router = express.Router();

// Load Chirp model
const Chirp = require("../model/chirp");

// @route   GET  api/Chirp/routes/chirpRoutes/test
// @desc    Tests "chirpRoutes" route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "chirpRoutes Works"}));

module.exports = router;
