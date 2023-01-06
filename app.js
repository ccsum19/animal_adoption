const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

require("dotenv").config();

const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const petRoute = require("./routes/pet.js");

const app = express();
const router = express.Router();

const publicPath = path.join(__dirname, 'build');

const port = 4000;

const dbURI = "mongodb+srv://dincatoo:91893max@cluster1.clh1p13.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI)
  .then((res) => {
    app.listen(port, () => console.log("Server is live at port " + port));
  }).catch(err => {
    console.log(err);
  });

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(__dirname+"/public/error.html");
  res.json({message: "Invalid route"});
});

app.use(cors());
const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json(), urlencodedParser);

app.use('/', userRoute);
app.use('/', petRoute);
app.post('/isUserAuth', authRoute);

app.use((req, res, next) => {
  res.setHeader('Access-Contorl-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST PATCH, DELETE');
    
    next();
});




