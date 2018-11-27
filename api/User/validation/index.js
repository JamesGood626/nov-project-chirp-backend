const { body } = require("express-validator/check");
const validator = require("validator");
const User = require("../model/user");
const { createUser } = require("../service");
const findUserByEmail = async email => {
  const userArr = await User.find({ email });
  Promise.resolve(userArr[0]);
};

const checkDuplicateEmail = email => {
  return findUserByEmail(email).then(user => {
    if (user) {
      return Promise.reject("E-mail already in use");
    }
  });
};

const checkUserInputs = [
  body("email").isEmail(),
  body("email").isLength({ max: 40 }),
  body("email").custom(checkDuplicateEmail),
  // Could add further validation to ensure that special
  // characters, symbols, and numbers are used.
  body("password").isLength({ min: 8 })
];

module.exports = checkUserInputs;
