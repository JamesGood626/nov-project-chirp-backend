//Reaction Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const likeSchema = new Schema({
  userUuid: {
    type: String,
    required: true
  },
  chirpUuid: {
    type: String,
    required: true
  }
});

const likeReaction =
  mongoose.models.Chirp || mongoose.model("Chirp", ChirpSchema);
