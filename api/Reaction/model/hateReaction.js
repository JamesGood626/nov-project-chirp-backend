//Reaction Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const hateSchema = new Schema({
  userUuid: {
    type: String,
    required: true
  },
  chirpUuid: {
    type: String,
    required: true
  }
});

const HateReaction =
  mongoose.models.Chirp || mongoose.model("Chirp", ChirpSchema);
