const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const userRoutes = require("./api/User/routes/userRoutes");
const chirpRoutes = require("./api/Chirp/routes/chirpRoutes");
const reactionRoutes = require("./api/Reaction/routes/reactionRoutes");

//Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

const DB_NAME = process.env.TEST_SUITE || "chirp";

const LOCAL_URI = `mongodb://localhost:27017/`;
const MONGO_URI = process.env.NODE_ENV === "prod" ? process.env.URL : LOCAL_URI;

//connecting to MongDB
mongoose
  .connect(
    MONGO_URI,
    { dbName: DB_NAME, useNewUrlParser: true }
  )
  .then(() => console.log("Mongo is Running"))
  .catch(err => console.log(err));

// Use Routes
userRoutes(app);
chirpRoutes(app);
reactionRoutes(app);
module.exports = app;
