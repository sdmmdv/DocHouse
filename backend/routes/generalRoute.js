const User = require('../models/User');
const Doctor = require('../models/Doctor');
const express = require('express');
const jwt = require('jsonwebtoken');
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



//Check if token is valid
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
     // may produce email
    if (!verified) return res.json(false);
//////////////////////////////////////////////////////////////////////
    
    const isUser = await User.exists({email: verified.email})
    const isDoctor = await Doctor.exists({email: verified.email})
    let type = ''; let data = '';
    if(isUser){
      type = 'user';
      data = await User.findById(verified.id);
    }
    else if(isDoctor){
      type = 'doctor';
      data = await Doctor.findById(verified.id);
    } 


    if (!data) {
      return res.json(false);
    }

    return res.json({isValid: true,type: type});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;