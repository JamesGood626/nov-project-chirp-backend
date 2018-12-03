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

// Would be ideal to do it this way, need to look into the docs and Stack overflow
// const deleteChirp = async id => {
//   const modifiedChirp = Chirp.findOneAndUpdate(
//     { id },
//     { deleted: true },
//     { new: true },
//     modifiedChirp => {
//       console.log("THE UPDATED CHIRP: ", modifiedChirp);
//       return modifiedChirp;
//     }
//   );
//   console.log("modifiedChirp: ", modifiedChirp);
// };

const deleteChirp = async id => {
  const [readErr, chirp] = await to(Chirp.findById(id));
  if (readErr) {
    return err;
  }
  chirp.deleted = true;
  const [writeErr, updatedChirp] = await to(chirp.save());
  return writeErr ? INTERNAL_SERVER_ERROR : NO_CONTENT;
};

const deleteChirpIfAuthorized = async (req, res) => {
  await authorizeUser(req, res);
  const status = await deleteChirp(req.params.id);
  res.send(status);
};

module.exports = deleteChirpIfAuthorized;
