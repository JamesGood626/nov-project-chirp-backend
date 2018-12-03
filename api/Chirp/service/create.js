const { to } = require("await-to-js");
const { validationResult } = require("express-validator/check");
const uuidv1 = require("uuid/v1");
const uuidv4 = require("uuid/v4");
// const User = require("../../User/model/user");
const Chirp = require("../model/chirp");
const authorizeUser = require("../../lib/authorization");
const {
  NO_CONTENT,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

// Level One Service
const createChirpIfAuthorized = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    return;
  }
  await authorizeUser(req, res);
  // create chirp
  const [err, createdChirpData] = await to(createChirpCatch(req.body));
  if (err) {
    res.status(UNPROCESSABLE_ENTITY).send();
    return;
  }
  res.json(createdChirpData);
};

// Level Two Service (called by createChirpIfValid)
const createChirpCatch = data => {
  return new Promise(async (resolve, reject) => {
    const [err, chirp] = await to(createChirp(data));
    if (err) {
      reject(err);
    }
    const payload = {
      data: {
        chirp: chirp
      }
    };
    resolve(payload);
  });
};

// Level Three Service (called by createChripCatch)
const createChirp = async data => {
  data.uuid = uuidv1() + uuidv4();
  let chirp = new Chirp(data);
  let err;
  [err, chirp] = await to(chirp.save());
  return err ? err : chirp;
};

module.exports = createChirpIfAuthorized;
