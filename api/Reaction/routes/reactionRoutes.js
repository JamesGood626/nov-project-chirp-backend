const express = require("express");
const router = express.Router();
const { to } = require("await-to-js");
const { updateReactionCount } = require("../service");
const LikeReaction = require("../model/likeReaction");
const HateReaction = require("../model/hateReaction");
const FavoriteReaction = require("../model/favoriteReaction");

const LIKES = "likes";
const HATES = "hates";
const FAVORITES = "favorites";

// chirp "like" route
router.put("/like/:chirpId", (req, res) => {
  updateReactionCount(req, res, LIKES, LikeReaction);
});

// chirp "hate" route
router.put("/hate/:chirpId", async (req, res) => {
  updateReactionCount(req, res, HATES, HateReaction);
});

//chirp "favorite" route
router.put("/favorite/:chirpId", async (req, res) => {
  updateReactionCount(req, res, FAVORITES, FavoriteReaction);
});

module.exports = router;
