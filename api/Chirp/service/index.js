const Chirp = require("../model/chirp");
const uuidv1 = require("uuid/v1");
const uuidv4 = require("uuid/v4");
const {
  NO_CONTENT,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

const createChirp = async data => {
  data.uuid = uuidv1() + uuidv4();
  const chirp = new Chirp(data);
  return await chirp.save();
};

const getAllChirps = async () => {
  return await Chirp.find();
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
  const chirp = await Chirp.findById(id);
  chirp.deleted = true;
  const updatedChirp = await chirp.save();
  if (updatedChirp.deleted === true) {
    return NO_CONTENT;
  } else {
    return INTERNAL_SERVER_ERROR;
  }
};

module.exports = {
  createChirp,
  deleteChirp,
  getAllChirps
};
