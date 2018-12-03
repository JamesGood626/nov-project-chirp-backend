const { to } = require("await-to-js");
const { validationResult } = require("express-validator/check");
const uuidv1 = require("uuid/v1");
const uuidv4 = require("uuid/v4");
// const User = require("../../User/model/user");
const Comment = require("../model/comment");
const authorizeUser = require("../../lib/authorization");
const {
  NO_CONTENT,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

// Level One Service
const createCommentIfAuthorized = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    return;
  }
  await authorizeUser(req, res);
  // create comment
  const [err, createdCommentData] = await to(createCommentCatch(req.body));
  if (err) {
    res.status(UNPROCESSABLE_ENTITY).send();
    return;
  }
  res.json(createdCommentData);
};

// Level Two Service (called by createCommentIfValid)
const createCommentCatch = data => {
  return new Promise(async (resolve, reject) => {
    const [err, comment] = await to(createComment(data));
    if (err) {
      reject(err);
    }
    const payload = {
      data: {
        comment: comment
      }
    };
    resolve(payload);
  });
};

// Level Three Service (called by createChripCatch)
const createComment = async data => {
  data.uuid = uuidv1() + uuidv4();
  let comment = new Comment(data);
  let err;
  [err, comment] = await to(comment.save());
  return err ? err : comment;
};

module.exports = createCommentIfAuthorized;
