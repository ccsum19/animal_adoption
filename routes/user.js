const router = require('express').Router();
let User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  User.find()
    .then(user => res.json(users))
    .catch(err => res.status(400).json('Err: ' + err));
});

router.post("/signup", async (req, res) => {
  const user = req.body;
  
  const takenEmail = await(User.findOne({email: user.email}));
  const takenUsername = await(User.findOne({username: user.username}));
  
  if(takenEmail || takenUsername) {
    res.json({message: "Username or Email has already been taken"});
  } else {
    user.password = await(bcrypt.hash(req.body.password,10));
    
    const dbUser =  new User({
      username: user.username.toLowerCase(),
      email:user.email.toLowerCase(),
      password:user.password
    });
    
    dbUser.save();
    res.json({message: "Success"});
  }
});

router.post("/login", async (req, res) => {
  const userLoggingIn = req.body;
  await User.findOne({username: userLoggingIn.username}).then(dbUser => {
    if(!dbUser) {
      return res.json({
        message: "Invalid Username or Password"
      });
    }
    bcrypt.compare(userLoggingIn.password, dbUser.password).then(isCorrect => {
      if(isCorrect) {
        const payload = {
          email: dbUser.email,
          username: dbUser.username
        };
        
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {expiresIn: 86400},
          (err,token) => {
            if(err) return res.json({message:err});
            return res.json({
              message: "Success",
              token: "Bearer " + token,
            });
          });
        }
      });
    });
});

router.post("/getusername", async (req,res) => {
  const token = req.headers["x-access-token"].split(' ')[1];
  if(token) {
     await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) return res.json({
        isLoggedIn: false,
        message: "Failed to Authenticate"
      });
      return res.json({username: decoded.username});
    });
  } else {
    return res.json({
      message: "Incorrect Token Given", isLoggedIn: false
    });
  }
});
module.exports = router;

