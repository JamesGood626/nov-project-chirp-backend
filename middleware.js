const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { to } = require("await-to-js");
const { comparePasswords } = require("./api/User/service");
const User = require("./api/User/model/user");

const errorOccuredMessage = {
  message: "An error occured while finding user."
};

const passwordsDontMatchMessage = {
  message: "Incorrect username or password."
};

const applyMiddleware = app => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("tiny"));

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const [err, user] = await to(User.findOne({ username }));
      if (err) {
        return done(null, false, errorOccuredMessage);
      }
      const passwordsMatch = await comparePasswords(user.password, password);
      if (!passwordsMatch) {
        return done(null, false, passwordsDontMatchMessage);
      }
      return done(null, user);
    })
  );

  app.use(passport.initialize());

  const DB_NAME = process.env.TEST_SUITE || "chirp";

  const LOCAL_URI = `mongodb://localhost:27017/`;
  const MONGO_URI =
    process.env.NODE_ENV === "prod" ? process.env.URL : LOCAL_URI;

  //connecting to MongDB
  mongoose
    .connect(
      MONGO_URI,
      { dbName: DB_NAME, useNewUrlParser: true }
    )
    .then(() => console.log("Mongo is Running"))
    .catch(err => console.log(err));
};

module.exports = applyMiddleware;
