//Reaction Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const favoriteSchema = new Schema({
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
  mongoose.models.Chirp || mongoose.model("Chirp", ChirpSchema);
