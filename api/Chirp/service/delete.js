const { to } = require("await-to-js");
const User = require("../../User/model/user");
const Chirp = require("../model/chirp");
const uuidv1 = require("uuid/v1");
const uuidv4 = require("uuid/v4");
const authorizeUser = require("../../lib/authorization");
const {
  NO_CONTENT,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

const deleteChirp = async uuid => {
  console.log("deleteChirp RUNNING!");
  const modifiedChirp = await Chirp.findOneAndUpdate(
    { uuid },
    { deleted: true },
    { new: true }
  );
  if (modifiedChirp.deleted === true) {
    return Promise.resolve(modifiedChirp);
  }
  return Promise.reject("Chirp wasn't updated.");
};

// The above way of updating a chirp is more efficient than
// retrieving the chirp, modifying the model, and then resaving it
// to the Database as seen below.
// return new Promise(async (resolve, reject) => {
//   console.log("deleteChirp RUNNING!");
//   const modifiedChirp = await Chirp.findOneAndUpdate(
//     { uuid },
//     { deleted: true },
//     { new: true }
//   );
//   console.log("modifiedChirp: ", modifiedChirp);
//   resolve(modifiedChirp);
// });

// const deleteChirp = async id => {
//   const [readErr, chirp] = await to(Chirp.findById(id));
//   if (readErr) {
//     return err;
//   }
//   chirp.deleted = true;
//   const [writeErr, updatedChirp] = await to(chirp.save());
//   return writeErr ? INTERNAL_SERVER_ERROR : NO_CONTENT;
// };

const deleteChirpIfAuthorized = async (req, res) => {
  await authorizeUser(req, res);
  const [err, updatedChirp] = await to(deleteChirp(req.params.id));
  const status = err ? INTERNAL_SERVER_ERROR : NO_CONTENT;
  res.send(status);
};

module.exports = deleteChirpIfAuthorized;
