const bcrypt = require("bcrypt");
const { to } = require("await-to-js");
const passport = require("passport");
const uuidv1 = require("uuid/v1");
const uuidv4 = require("uuid/v4");
const User = require("../model/user");

const createUser = async data => {
  const { username, email } = data;
  const uuid = uuidv1() + uuidv4();
  let user = new User({ username, email, uuid });
  let err;
  //
  [err, user] = await to(hashPasswordAndSaveUser(user, data));
  if (err) {
    return err;
  }
  return user;
};

const getAllUsers = async () => {
  let [err, users] = await to(User.find());

  return err ? err : users;
};

// How would you test that this verifiably
// hashes the password? Ask Charles.
const hashPasswordAndSaveUser = async (user, data) => {
  const { password } = data;
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, (saltRounds = 10), async (error, hash) => {
      if (error) {
        reject(error);
      }
      // Store hash in your password DB.
      user.password = hash;
      let err;
      [err, user] = await to(user.save());
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });
};

const comparePasswords = (hashedPassword, passwordInput) => {
  return new Promise(async (resolve, reject) => {
    await bcrypt.compare(passwordInput, hashedPassword, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

const loginUser = data => {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        reject(err);
      }
      if (!user) {
        reject(info);
      }
      resolve(user);
    })({ body: data });
  });
};

module.exports = {
  comparePasswords,
  loginUser,
  createUser,
  getAllUsers
};
