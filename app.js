const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const userRoutes = require("./api/User/routes/userRoutes");
console.log("USER ROUTES: ", userRoutes);
// const chirp = require("./api/Chirp/routes/chirpRoutes");
// const user = require("./api/User/routes/userRoutes");

//Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? `mongodb://localhost:27017/${process.env.TEST_SUITE}`
    : process.env.URL;

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

module.exports = app;
