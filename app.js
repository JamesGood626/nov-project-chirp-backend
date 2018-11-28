const express = require("express");
const app = express();
const applyMiddleware = require("./middleware");
const userRoutes = require("./api/User/routes/userRoutes");
const chirpRoutes = require("./api/Chirp/routes/chirpRoutes");
const reactionRoutes = require("./api/Reaction/routes/reactionRoutes");

applyMiddleware(app);

// Use Routes
app.use("/user", userRoutes);
app.use("/chirp", chirpRoutes);
app.use("/chirp/reaction/", reactionRoutes);

module.exports = app;
