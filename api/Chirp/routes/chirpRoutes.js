const { createChirp, deleteChirp, getAllChirps } = require("../service");
// const router = express.Router();

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
    res.json(await getAllChirps());
  });

  //create new chirp
  app.post("/chirp", async (req, res) => {
    res.json({
      data: {
        chirp: await createChirp(req.body)
      }
    });
  });

  // (soft) delete chirp
  app.put("/chirp/delete/:id", async (req, res) => {
    const status = await deleteChirp(req.params.id);
    res.send(status);
  });
};

module.exports = chirpRoutes;
