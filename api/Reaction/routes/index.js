const { lookUpReaction } = require("../service");
const LikeReaction = require("../model/likeReaction");
const HateReaction = require("../model/hateReaction");
const FavoriteReaction = require("../model/FavoriteReaction");

// chirp "like" route
app.put("/chirp/like/:chirpId", async (req, res) => {
  // chirpId will be available on req.params
  return await lookUpReaction(LikeReaction, req.body);
});

// chirp "hate" route
app.put("/chirp/hate/:chirpId", async (req, res) => {
  return await lookUpReaction(HateReaction, req.body);
});

//chirp "favorite" route
app.put("/chirp/favorite/:chirpId", async (req, res) => {
  return await lookUpReaction(FavoriteReaction, req.body);
});
