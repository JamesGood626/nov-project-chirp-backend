const { body } = require("express-validator/check");
const validator = require("validator");

const checkCommentInputs = [
  body("comment")
    .isLength({ min: 10 })
    .withMessage("Comment must be at least 10 characters."),
  body("comment")
    .isLength({ max: 240 })
    .withMessage("Comment may not exceed 240 characters.")
];

module.exports = checkCommentInputs;
