const { createChirp, getAllChirps } = require("../service");
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
    res.json(await createChirp(req.body));
  });

  // chirp "like" route
  app.put('/chirp/like/:chirpId', async (req, res) => {
    // chirpId will be available on req.params
  });

   // chirp "hate" route
  app.put('/chirp/hate/:chirpId', async (req, res) => {
    
  });

  //chirp "favorite" route
  app.put('/chirp/favorite/:chirpId', async (req, res) => {
    
  });

};




module.exports = chirpRoutes;
