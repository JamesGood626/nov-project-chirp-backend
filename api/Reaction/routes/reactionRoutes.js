const { to } = require("await-to-js");
const { lookUpReaction } = require("../service");
const LikeReaction = require("../model/likeReaction");
const HateReaction = require("../model/hateReaction");
const FavoriteReaction = require("../model/favoriteReaction");
const {
  SUCCESS,
  NO_CONTENT,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

const reactionRoutes = app => {
  // chirp "like" route
  app.put("/chirp/like", async (req, res) => {
    // chirpId will be available on req.params
    req.body.type = "likes";
    let err;
    let updatedChirpLikeCount;
    [err, updatedChirpLikeCount] = await to(
      lookUpReaction(LikeReaction, req.body)
    );
    if (err) {
      res.status(UNPROCESSABLE_ENTITY).send();
    }
    res.status(SUCCESS);
    res.json({ data: { likeCount: updatedChirpLikeCount } });
  });

  // chirp "hate" route
  app.put("/chirp/hate", async (req, res) => {
    req.body.type = "hates";
    let err;
    let updatedChirppHateCount;
    [err, updatedChirpHateCount] = await to(
      lookUpReaction(HateReaction, req.body)
    );
    if (err) {
      res.status(UNPROCESSABLE_ENTITY).send();
    }
    res.status(SUCCESS);
    res.json({ data: { hateCount: updatedChirpHateCount } });
  });

  //chirp "favorite" route
  app.put("/chirp/favorite", async (req, res) => {
    req.body.type = "favorites";
    let err;
    let updatedChirpFavoriteCount;
    [err, updatedChirpFavoriteCount] = await to(
      lookUpReaction(FavoriteReaction, req.body)
    );
    if (err) {
      res.status(UNPROCESSABLE_ENTITY).send();
    }
    res.status(SUCCESS);
    res.json({ data: { favoriteCount: updatedChirpFavoriteCount } });
  });
};

module.exports = reactionRoutes;
//refactor if time, condense so we dont repeat our code.
