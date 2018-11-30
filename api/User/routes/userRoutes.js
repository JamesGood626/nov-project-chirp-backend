const express = require("express");
const router = express.Router();
const { promisify } = require("util");
const { validationResult } = require("express-validator/check");
const { to } = require("await-to-js");
const jwt = require("jsonwebtoken");
const { createUser, loginUser, getAllUsers } = require("../service");
const checkUserInputs = require("../validation");
const { UNPROCESSABLE_ENTITY } = require("../../StatusCodeConstants");
// @route   Get api/User/routes/userRoutes/test
// @desc    Tests "userRoutes" route
// @access  Public
// router.get("/test", (req, res) => res.json({ msg: "userRoutes Works" }));

//register user
router.post("/", checkUserInputs, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }
  const [err, user] = await to(createUser(req.body));
  if (err) {
    // subject to change. INTERNAL_SERVER_ERROR?
    res.status(UNPROCESSABLE_ENTITY);
    return res.json({ error: err.message });
  }
  res.json({ username: user.username });
});

router.post("/login", async (req, res) => {
  let err;
  let user;
  let token;
  [err, user] = await to(loginUser(req.body));
  if (err) {
    res.status(UNPROCESSABLE_ENTITY).send(err);
    return;
  }
  const { uuid, username, email } = user;
  const promisifiedJwtSign = promisify(jwt.sign);
  const expOption = { expiresIn: 60 * 60 };
  [err, token] = await to(
    promisifiedJwtSign({ userUuid: uuid }, process.env.SECRET_SHHH, expOption)
  );
  const data = {
    uuid,
    username,
    email,
    token
  };
  res.json(data);
});

router.get("/all-users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

module.exports = router;
