//Reaction Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FavoriteSchema = new Schema({
  userUuid: {
    type: String,
    required: true
  },
  chirpUuid: {
    type: String,
    required: true
  }
});

const FavoriteReaction =
  mongoose.models.FavoriteReaction ||
  mongoose.model("FavoriteReaction", FavoriteSchema);
module.exports = FavoriteReaction;
