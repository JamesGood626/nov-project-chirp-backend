const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true})
    .then(() => console.log("Mongo is Running"))
    .catch(err => console.log(err));


 //app.listen()

//






