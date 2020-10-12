const User = require('../models/User');
const Doctor = require('../models/Doctor');
const express = require('express');
const router = new express.Router();

// Get type of logged in user
router.get('/get-type', async (req, res) => {

  const isUser = await User.exists({email: req.body.email})
  const isDoctor = await Doctor.exists({email: req.body.email})
  let ret_val = '';
  if(isUser){
    ret_val = 'user';
  }
  else if(isDoctor){
    ret_val = 'doctor';
  } 
  res.status(200).json(ret_val);
}); 

module.exports = router;