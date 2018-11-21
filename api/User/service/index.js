const User = require("../model/user");
const uuidv1 = require("uuid/v1");
const uuidv4 = require("uuid/v4");

const createUser = async data => {
  data.uuid = uuidv1() + uuidv4();
  const user = new User(data);
  return await user.save();
};

const getAllUsers = async () => {
  return await User.find();
};

module.exports = {
  createUser,
  getAllUsers
};
