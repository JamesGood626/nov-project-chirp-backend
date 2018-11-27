const { body } = require("express-validator/check");
const validator = require("validator");

const checkChirpInputs = [
  body("message")
    .isLength({ min: 10 })
    .withMessage("Chirp must be at least 10 characters."),
  body("message")
    .isLength({ max: 240 })
    .withMessage("Chirp may not exceed 240 characters.")
];

module.exports = checkChirpInputs;
