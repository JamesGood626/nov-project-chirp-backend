const Comment = require("../model/comment");
const { to } = require("await-to-js");
const authorizeUser = require("../../lib/authorization");
const {
  SUCCESS,
  NO_CONTENT,
  NOT_MODIFIED,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

const getCommentsIfAuthorized = async (req, res) => {
  console.log("THE REQ PARAMS:", req.params);
  await authorizeUser(req, res);
  const [err, comments] = await to(getCommentsForChirp(req.params.chirpId));
  console.log("THE ERR: ", err);
  console.log("GOT THE COMMENTS: ", comments);
  if (err) {
    console.log(err);
    res.status(UNPROCESSABLE_ENTITY).json(err);
  }
  console.log(comments);
  res.json({ data: comments });
};

const getCommentsForChirp = async chirpId => {
  const [err, comments] = await to(
    Comment.find({
      chirpUuid: chirpId
    })
  );

  return err ? Promise.reject(err) : Promise.resolve(comments);
};

module.exports = getCommentsIfAuthorized;
