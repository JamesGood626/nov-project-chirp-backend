//User Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  uuid: {
    type: String,
    required: true
  },
  email: String,
  username: String
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
