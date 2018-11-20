//Chirp Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ChirpSchema = new Schema({
  message: String,
  deleted: Boolean,
  likes: { type: Number, default: 0 },
  hates: { type: Number, default: 0 },
  favorites: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  /*user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }*/
  username: String
});

const Chirp = mongoose.models.Chirp || mongoose.model("Chirp", ChirpSchema);

module.exports = Chirp;
