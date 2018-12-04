//User Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userUuid: {
        type: String,
        required: true
      },
    comment:String,
    email: String,
    username: String,
    chirpUuid: {
        type: String,
        required: true
      },
    deleted: false,
    modified_at:{
        type:Date,
        default:Date.now()
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
})
const Comment =
    mongoose.models.Comment ||
    mongoose.model("Comment", CommentSchema);
module.exports = Comment;

