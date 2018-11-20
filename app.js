const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const userRoutes = require("./api/User/routes/userRoutes");
const chirpRoutes = require("./api/Chirp/routes/chirpRoutes");
//Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

const LOCAL_URI =
  process.env.NODE_ENV === "test"
    ? `mongodb://localhost:27017/${process.env.TEST_SUITE}`
    : `mongodb://localhost:27017/chirp`;
const MONGO_URI = process.env.NODE_ENV === "prod" ? process.env.URL : LOCAL_URI;

//connecting to MongDB
mongoose
  .connect(
    MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongo is Running"))
  .catch(err => console.log(err));

// Use Routes
userRoutes(app);
chirpRoutes(app);
module.exports = app;
