const { body } = require("express-validator/check");
const validator = require("validator");
const User = require("../model/user");

const checkUserInputs = [body("message").isLength({ max: 240 })];

module.exports = checkUserInputs;
