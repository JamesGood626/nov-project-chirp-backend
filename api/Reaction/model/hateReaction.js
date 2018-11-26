//Reaction Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const HateSchema = new Schema({
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
  mongoose.models.HateReaction || mongoose.model("HateReaction", HateSchema);

module.exports = HateReaction;
