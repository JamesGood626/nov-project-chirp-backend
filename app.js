const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const applyMiddleware = require("./middleware");
const userRoutes = require("./api/User/routes/userRoutes");
const chirpRoutes = require("./api/Chirp/routes/chirpRoutes");
const reactionRoutes = require("./api/Reaction/routes/reactionRoutes");
const commentRoutes = require("./api/Reaction/routes/commentRoutes");

if (process.env.NODE_ENV === "test") {
  process.env.SECRET_SHHH = "shh";
}

applyMiddleware(app);

const verifyJwt = (req, res, next) => {
  const { authorization } = req.headers;
  const [_, token] = authorization.split(" ");
  const decoded = jwt.verify(token, process.env.SECRET_SHHH);
  req.user = decoded;
  next();
};

// Use Routes
app.use("/user", userRoutes);
app.use(verifyJwt);
app.use("/chirp", chirpRoutes);
app.use("/chirp/reaction/", reactionRoutes);
app.use("/chirp/comment/", commentRoutes);
module.exports = app;
