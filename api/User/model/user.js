<<<<<<< Updated upstream
=======
//User Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userId: Number,
    email: String,
    username: String
});


module.exports = { User: mongoose.model("User", UserSchema)};
>>>>>>> Stashed changes
