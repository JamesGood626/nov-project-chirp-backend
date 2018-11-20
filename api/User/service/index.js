const User = require("../model/user");

const createUser = async input => {
  const user = new User(input);
  return await user.save();
};
const getAllUsers = async input => {
  return await User.find();
};
module.exports = {
  createUser,
  getAllUsers
};
