const { to } = require("await-to-js");
const User = require("../User/model/user");
const { UNPROCESSABLE_ENTITY } = require("../StatusCodeConstants");

const authorizeUser = async (req, res) => {
  const { iat, exp, userUuid } = req.user;
  if (iat < exp) {
    const [err, user] = await to(checkIfValidUser(userUuid));
    if (err) {
      // Might be a different status code that we should use here?
      res.status(UNPROCESSABLE_ENTITY).send();
    }
    // Mutating req.body to facilitate providing the necessary data for Chirp creation.
    req.body.user = user._id;
    req.body.username = user.username;
  }
};

const checkIfValidUser = userUuid => {
  return new Promise(async (resolve, reject) => {
    const [err, user] = await to(User.findOne({ uuid: userUuid }));
    if (err) {
      reject(err);
    }
    resolve(user);
  });
};

module.exports = authorizeUser;
