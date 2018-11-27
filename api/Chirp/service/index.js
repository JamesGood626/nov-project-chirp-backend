const { to } = require("await-to-js");
const Chirp = require("../model/chirp");
const uuidv1 = require("uuid/v1");
const uuidv4 = require("uuid/v4");
const {
  NO_CONTENT,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

const createChirp = async data => {
  data.uuid = uuidv1() + uuidv4();
  let chirp = new Chirp(data);
  let err;
  [err, chirp] = await to(chirp.save());
  return err ? err : chirp;
};

const getAllChirps = async () => {
  const [err, chirps] = await to(Chirp.find());
  return err ? err : chirps;
};

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

module.exports = {
  createChirp,
  deleteChirp,
  getAllChirps
};
