const { to } = require("await-to-js");
const Chirp = require("../model/chirp");
const authorizeUser = require("../../lib/authorization");

const retrieveAllChirps = async (req, res) => {
  //returns chirps with empty commentData array
  const [err, chirps] = await to(Chirp.find());

  return err ? Promise.reject(err) : Promise.resolve(chirps);
};

const allChirpsIfAuthorized = async (req, res) => {
  await authorizeUser(req, res);
  const [err, chirps] = await to(retrieveAllChirps(req, res));
  if (err) {
    return res.json(err);
  }
  res.json(chirps);
};

module.exports = {allChirpsIfAuthorized, retrieveAllChirps};
