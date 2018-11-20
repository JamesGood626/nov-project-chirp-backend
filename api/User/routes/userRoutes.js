// const express = require("express");
// const router = express.Router();
const { createUser } = require("../service");
// @route   Get api/User/routes/userRoutes/test
// @desc    Tests "userRoutes" route
// @access  Public
// router.get("/test", (req, res) => res.json({ msg: "userRoutes Works" }));
const userRoutes = app => {
  app.post("/user", async (req, res) => {
    console.log("HIT THE USER ROUTE: ", req.body);

    const user = await createUser(req.body);
    console.log(user);
    res.json({ username: user.username });
  });
};

module.exports = userRoutes;

// module.exports = router;
