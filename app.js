const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const applyMiddleware = require("./middleware");
const userRoutes = require("./api/User/routes/userRoutes");
const chirpRoutes = require("./api/Chirp/routes/chirpRoutes");
const reactionRoutes = require("./api/Reaction/routes/reactionRoutes");
const commentRoutes = require("./api/Comment/routes/commentRoutes");
const { UNPROCESSABLE_ENTITY } = require("./api/StatusCodeConstants");

if (process.env.NODE_ENV === "test") {
  process.env.SECRET_SHHH = "shh";
}

applyMiddleware(app);

const verifyJwt = (req, res, next) => {
  const { authorization } = req.headers;
  if (typeof authorization === "string") {
    const [_, token] = authorization.split(" ");
    const decoded = jwt.verify(token, process.env.SECRET_SHHH);
    req.user = decoded;
    next();
  } else {
    // give the client some indication that they need to redirect to the login page?
    res.status(UNPROCESSABLE_ENTITY).send();
  }
};

// Use Routes
app.use("/user", userRoutes);
app.use(verifyJwt);
app.use("/chirp", chirpRoutes);
app.use("/chirp/reaction/", reactionRoutes);
app.use("/chirp/comment/", commentRoutes);
module.exports = app;
