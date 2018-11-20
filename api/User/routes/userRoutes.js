const express = require("express");
const router = express.Router();

// Load User model
const User = require("../model/user");

// @route   Get api/User/routes/userRoutes/test
// @desc    Tests "userRoutes" route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "userRoutes Works" }));



module.exports = router;
