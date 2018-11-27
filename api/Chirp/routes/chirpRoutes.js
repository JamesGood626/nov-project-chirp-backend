const { validationResult } = require("express-validator/check");
const { createChirp, deleteChirp, getAllChirps } = require("../service");
const checkChirpInputs = require("../validation");
const { to } = require("await-to-js");
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
const chirpRoutes = app => {
  //return all chirps
  app.get("/chirp", async (req, res) => {
    const [err, chirps] = await to(getAllChirps());
    if (err) {
      return res.json(err);
    }
    res.json(chirps);
  });

  //create new chirp
  app.post("/chirp", checkChirpInputs, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
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
  app.put("/chirp/delete/:id", async (req, res) => {
    const status = await deleteChirp(req.params.id);
    res.send(status);
  });
};

module.exports = chirpRoutes;
