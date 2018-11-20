//Chirp Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ChirpSchema = new Schema({
    userId: Number,   //Eh?
    message: String,
    deleted: Boolean,
    likes: Number,
    hates: Number, 
    favorites: Number,
    created_at: { type: Date, default: Date.now }
});

module.exports = {Chirp: mongoose.model("Chirp", ChirpSchema)};