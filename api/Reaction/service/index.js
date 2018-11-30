const { to } = require("await-to-js");
const Chirp = require("../../Chirp/model/chirp");
const {
  SUCCESS,
  NO_CONTENT,
  NOT_MODIFIED,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

const updateReactionCount = async (req, res, type, Model) => {
  //iat = issued at time
  const { iat, exp } = req.user;
  if (iat < exp) {
    req.body.type = type;
    req.body.chirpUuid = req.params.chirpId;
    req.body.userUuid = req.user.userUuid;
    let err;
    let updatedCount;
    [err, updatedCount] = await to(lookUpReaction(Model, req.body));
    sendResponse(res, type, updatedCount, err);
  } else {
    // send indication to the client that user needs to login
    // status code?
  }
};

const lookUpReaction = async (ReactionModel, data) => {
  const { userUuid, chirpUuid } = data;
  let err;
  let reaction;
  let updatedReactionCount;
  [err, reaction] = await to(ReactionModel.find({ userUuid, chirpUuid }));
  if (reaction.length !== 0) {
    // Reaction already created, send back not fulfilled
    return false;
  } else {
    [err, updatedReactionCount] = await to(createReaction(ReactionModel, data));
    return err ? err : updatedReactionCount;
  }
};

const createReaction = async (ReactionModel, data) => {
  const { chirpUuid, type } = data;
  const [err, reaction] = await to(new ReactionModel(data).save());
  if (err) {
    throw err;
  }
  const [readErr, chirpArr] = await to(Chirp.find({ uuid: chirpUuid }));
  if (readErr) {
    throw readErr;
  }
  let chirp;
  if (chirpArr.length === 1) {
    chirp = chirpArr[0];
    chirp[type] += 1;
    const [saveErr, updatedChirp] = await to(chirp.save());
    // returning the updated like count
    return saveErr ? saveErr : updatedChirp[type];
  }
  // return not successful result/status
  return false;
};

// will move this out
const sendResponse = (res, type, count, err) => {
  if (err) {
    res.status(UNPROCESSABLE_ENTITY).send();
  }
  if (!count) {
    res.status(NOT_MODIFIED).send();
  } else {
    const dataKey = type + "Count";
    res.status(SUCCESS);
    res.json({ data: { [dataKey]: count } });
  }
};

module.exports = { updateReactionCount };
