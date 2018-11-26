const { body } = require("express-validator/check");
const validator = require("validator");
const User = require("../model/user");

const findUserByEmail = async email => {
  const userArr = await User.find({ email });
  Promise.resolve(userArr[0]);
};

const checkDuplicateEmail = email => {
  return findUserByEmail(email).then(user => {
    console.log("RETRIEVED USER: ", user);
    if (user) {
      return Promise.reject("E-mail already in use");
    }
  });
};

const checkUserInputs = [
  body("email").isEmail(),
  body("email").isLength({ max: 40 }),
  body("email").custom(checkDuplicateEmail)
];

module.exports = checkUserInputs;
