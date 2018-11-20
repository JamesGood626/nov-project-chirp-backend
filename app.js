const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

<<<<<<< Updated upstream

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

=======
<<<<<<< Updated upstream
const BASE_URI = "mongodb://localhost:27017/test";
const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? `${BASE_URI}/${process.env.TEST_SUITE}`
    : `${BASE_URI}/chirp_test`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongo is Running"))
  .catch(err => console.log(err));

const port = process.env.PORT || 27017;
app.listen(port, () =>
  console.log(`Mongoose's are running around on port ${port}`)
);
=======
//Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//connecting to MongDB
>>>>>>> Stashed changes
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true})
    .then(() => console.log("Mongo is Running"))
    .catch(err => console.log(err));

<<<<<<< Updated upstream


=======
//Express App
>>>>>>> Stashed changes
const port = process.env.PORT || 27017;   
app.listen(port, () => console.log(`Mongoose's are running around on port ${port}`))







<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
