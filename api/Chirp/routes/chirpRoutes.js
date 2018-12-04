const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator/check");
const createChirpIfAuthorized = require("../service/create");
const {allChirpsIfAuthorized} = require("../service/retrieve");
const deleteChirpIfAuthorized = require("../service/delete");
const checkChirpInputs = require("../validation");
const { to } = require("await-to-js");
const User = require("../../User/model/user");
const Chirp = require("../model/chirp");
const {
  NO_CONTENT,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

// Load Chirp model
// const Chirp = require("../model/chirp");

// @route   GET  api/Chirp/routes/chirpRoutes/test
// @desc    Tests "chirpRoutes" route
// @access Public
// router.get("/chirps", (req, res) =>{
//     res.json({ msg: "chirpRoutes Works"}));
// })

//return all chirps
router.get("/", allChirpsIfAuthorized);

// create new chirp
router.post("/", checkChirpInputs, createChirpIfAuthorized);

// (soft) delete chirp
router.put("/delete/:id", deleteChirpIfAuthorized);

module.exports = router;
