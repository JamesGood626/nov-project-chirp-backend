const { body } = require("express-validator/check");
const validator = require("validator");

const checkCommentInputs = [
  body("message")
    .isLength({ min: 10 })
    .withMessage("Comment must be at least 10 characters."),
  body("message")
    .isLength({ max: 240 })
    .withMessage("Comment may not exceed 240 characters.")
];

module.exports = checkCommentInputs;
