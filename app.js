const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true})
    .then(() => console.log("Mongo is Running"))
    .catch(err => console.log(err));



const port = process.env.PORT || 27017;   
app.listen(port, () => console.log(`Mongoose's are running around on port ${port}`))







