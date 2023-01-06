const router = require('express').Router();
let User = require('../models/user');
let Pet = require('../models/pet');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

router.post("/addpet", async (req,res) => {
  const userAddingPet = req.body;
  var user;
  await User.findOne({username: userAddingPet.username}).then(dbUser => {
    user = dbUser;
    
    if(dbUser){
      let newPet = {
          username: req.body.username,
          name: req.body.name,
          description: req.body.description,
          notes: req.body.notes,
      }
      
      Pet.create(newPet, (err, item) => {
          if (err) {
              console.log(err);
          }
          else {
            item.save();
          }
      });
    }
  });
  await Pet.findOne({name: req.body.name}).then(dbPet => {
    if(dbPet) {
      
      user.pets.push(dbPet);
      res.json({message: "success", petAdded: true, pet: dbPet});
    }
  });
});

router.post("/getpets", async (req, res) => {
  const userGettingPets = req.body;
  console.log(userGettingPets);
    await User.findOne({username: userGettingPets.username}).then(dbUser => {
      if(dbUser) {
        console.log(dbUser.pets);
        res.json({message: "Success", pets: dbUser.pets});
      }
    });
});

module.exports = router;
