const User = require("../model/user");

const createUser = async input => {
  const user = new User(input);
  return await user.save();
};

module.exports = {
  createUser: createUser
};
