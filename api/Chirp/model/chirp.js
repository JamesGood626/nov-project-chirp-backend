//Chirp Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ChirpSchema = new Schema({
  uuid: {
    type: String,
    required: true
  },
  message: {
    type: String,
    require: true
  },
  username: {
    type: String,
    required: true
  },
  // AND we're going to temporarily stick with username for now,
  // until the Auth situation is figured out.
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User"
  //   // SHould be true, but we need to figure out Authentication and Authorization first.
  //   // required: true
  // },
  deleted: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  hates: { type: Number, default: 0 },
  favorites: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now() }
});

const Chirp = mongoose.models.Chirp || mongoose.model("Chirp", ChirpSchema);

module.exports = Chirp;
