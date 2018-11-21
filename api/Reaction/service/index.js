const createReaction = async (Model, data) => {
  // Create a likeReaction and retrieve the chirpByUuid and increment
  // the likeReaction count.
  // send successful status code 204.
};

const lookUpReaction = async (ReactionModel, data) => {
  const { userUuid, chirpUuid } = data;
  const reaction = await ReactionModel.find({ userUuid, chirpUuid });
  if (reaction) {
    return await createReaction(ReactionModel, data);
  } else {
    // Send back request could not be fulfilled status.
  }
};

module.exports = { lookUpReaction };
