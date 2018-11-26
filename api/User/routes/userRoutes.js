// const express = require("express");
// const router = express.Router();
const { validationResult } = require("express-validator/check");
const { createUser, getAllUsers } = require("../service");
const checkUserInputs = require("../validation");
const { UNPROCESSABLE_ENTITY } = require("../../StatusCodeConstants");
// @route   Get api/User/routes/userRoutes/test
// @desc    Tests "userRoutes" route
// @access  Public
// router.get("/test", (req, res) => res.json({ msg: "userRoutes Works" }));
const userRoutes = app => {
  app.post("/user", checkUserInputs, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    const user = await createUser(req.body);
    res.json({ username: user.username });
  });

  app.get("/users", async (req, res) => {
    console.log("can GET users");
    const users = await getAllUsers();
    res.json(users);
  });
};

module.exports = userRoutes;

// module.exports = router;
