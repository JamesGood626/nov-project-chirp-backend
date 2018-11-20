//Chirp Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ChirpSchema = new Schema({
  message: String,
  deleted: Boolean,
  likes: Number,
  hates: Number,
  favorites: Number,
  created_at: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Chirp = mongoose.models.Chirp || mongoose.model("Chirp", ChirpSchema);

module.exports = Chirp;
