const Chirp = require("../model/chirp");

const createChirp = async data => {
  const chirp = new Chirp(data);
  return await chirp.save();
};

const getAllChirps = async () => {
  return await Chirp.find();
};

module.exports = {
  createChirp,
  getAllChirps
};
