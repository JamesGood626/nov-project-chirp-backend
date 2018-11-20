// const express = require("express");
// const router = express.Router();
const { createUser, getAllUsers } = require("../service");
// @route   Get api/User/routes/userRoutes/test
// @desc    Tests "userRoutes" route
// @access  Public
// router.get("/test", (req, res) => res.json({ msg: "userRoutes Works" }));
const userRoutes = app => {
  app.post("/user", async (req, res) => {
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
