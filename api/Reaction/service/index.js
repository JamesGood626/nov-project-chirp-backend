const Chirp = require("../../Chirp/model/chirp");
const {
  SUCCESS,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

const createReaction = async (ReactionModel, data) => {
  const { chirpUuid, type } = data;
  await new ReactionModel(data).save();
  const chirpArr = await Chirp.find({ uuid: chirpUuid });
  let chirp;
  if (chirpArr.length === 1) {
    chirp = chirpArr[0];
    chirp[type] += 1;
    await chirp.save();
    // returning the updated like count
    return chirp[type];
  }
  // return not successful result/status
};

const lookUpReaction = async (ReactionModel, data) => {
  const { userUuid, chirpUuid } = data;
  const reaction = await ReactionModel.find({ userUuid, chirpUuid });
  console.log("THE RETRIEVED REACTION: ", reaction);
  if (reaction.length !== 0) {
    // Reaction already created, send back not fulfilled
  } else {
    const updatedReactionCount = await createReaction(ReactionModel, data);
    console.log("THE UPDATED REACTION COUNT: ", updatedReactionCount);
    return updatedReactionCount;
  }
};

module.exports = { lookUpReaction };
