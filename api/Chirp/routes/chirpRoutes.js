const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator/check");
const { createChirp, deleteChirp, getAllChirps } = require("../service");
const checkChirpInputs = require("../validation");
const { to } = require("await-to-js");
const User = require("../../User/model/user");
const Chirp = require("../model/chirp");
const {
  NO_CONTENT,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR
} = require("../../StatusCodeConstants");

// Load Chirp model
// const Chirp = require("../model/chirp");

// @route   GET  api/Chirp/routes/chirpRoutes/test
// @desc    Tests "chirpRoutes" route
// @access Public
// router.get("/chirps", (req, res) =>{
//     res.json({ msg: "chirpRoutes Works"}));
// })

//return all chirps
router.get("/", async (req, res) => {
  const [err, chirps] = await to(getAllChirps());
  if (err) {
    return res.json(err);
  }
  res.json(chirps);
});

//create new chirp
router.post("/", checkChirpInputs, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    return;
  }
  const { iat, exp, userUuid } = req.user;
  if (iat < exp) {
    //get user from db
    console.log("THE UUID WE NEED: ", userUuid);
    const user = await User.findOne({ uuid: userUuid });
    console.log("THE USER WE NEED: ", user);
    if (user) {
      const id = user._id;
      req.body.user = id;
    } else {
      res.status(UNPROCESSABLE_ENTITY).send();
      return;
    }
  } else {
    res.status(UNPROCESSABLE_ENTITY).send();
    return;
  }

  const [err, chirp] = await to(createChirp(req.body));

  if (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ errors: [err] });
    return;
  } else {
    res.json({
      data: {
        chirp: chirp
      }
    });
  }
});

// (soft) delete chirp
router.put("/delete/:id", async (req, res) => {
  const status = await deleteChirp(req.params.id);
  res.send(status);
});

module.exports = router;
