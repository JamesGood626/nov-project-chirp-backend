const { to } = require("await-to-js");
const uuidv1 = require("uuid/v1");
const uuidv4 = require("uuid/v4");
const User = require("../model/user");

const createUser = async data => {
  data.uuid = uuidv1() + uuidv4();
  let user = new User(data);
  let err;
  [err, user] = await to(user.save());
  if (err) {
    return err;
  }
  return user;
};

const getAllUsers = async () => {
  let [err, users] = await to(User.find());

  return err ? err : users;
};

module.exports = {
  createUser,
  getAllUsers
};
