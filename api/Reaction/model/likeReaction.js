//Reaction Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const LikeSchema = new Schema({
  userUuid: {
    type: String,
    required: true
  },
  chirpUuid: {
    type: String,
    required: true
  }
});

const LikeReaction =
  mongoose.models.LikeReaction || mongoose.model("LikeReaction", LikeSchema);

module.exports = LikeReaction;
