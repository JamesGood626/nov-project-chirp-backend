const { to } = require("await-to-js");
const Chirp = require("../model/chirp");
const authorizeUser = require("../../lib/authorization");

const retrieveAllChirps = async (req, res) => {
  await authorizeUser(req, res);
  const [err, chirps] = await to(Chirp.find());
  return err ? err : chirps;
};

const allChirpsIfAuthorized = async (req, res) => {
  const [err, chirps] = await to(retrieveAllChirps(req, res));
  if (err) {
    return res.json(err);
  }
  res.json(chirps);
};

module.exports = allChirpsIfAuthorized;
