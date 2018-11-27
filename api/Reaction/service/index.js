const { to } = require("await-to-js");
const Chirp = require("../../Chirp/model/chirp");
const {
  SUCCESS,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

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

module.exports = { lookUpReaction };
