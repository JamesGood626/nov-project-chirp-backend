const { lookUpReaction } = require("../service");
const LikeReaction = require("../model/likeReaction");
const HateReaction = require("../model/hateReaction");
const FavoriteReaction = require("../model/favoriteReaction");
const {
  SUCCESS,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

const reactionRoutes = app => {
  // chirp "like" route
  app.put("/chirp/like", async (req, res) => {
    // chirpId will be available on req.params
    req.body.type = "likes";
    const updatedChirpLikeCount = await lookUpReaction(LikeReaction, req.body);
    if (updatedChirpLikeCount) {
      res.status(SUCCESS);
      res.json({ data: { likeCount: updatedChirpLikeCount } });
    }
  });

  // chirp "hate" route
  app.put("/chirp/hate", async (req, res) => {
    req.body.type = "hates";
    return await lookUpReaction(HateReaction, req.body);
  });

  //chirp "favorite" route
  app.put("/chirp/favorite", async (req, res) => {
    req.body.type = "favorites";
    return await lookUpReaction(FavoriteReaction, req.body);
  });
};

module.exports = reactionRoutes;
