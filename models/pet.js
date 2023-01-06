const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  
  name: {
    type: String,
  },
  
  description: {
    type: String,
  },
  
  notes: {
    type: String,
  },
  
  img: {
    data: Buffer,
    contentType: String,
  },
  
  
  }, {timestamps: true});
  
module.exports = mongoose.model("Pet", petSchema);
