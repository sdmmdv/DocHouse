const User = require('../models/User');
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = new express.Router();
const ObjectId = require('mongodb').ObjectID;

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

// Store review to the Doctor schema
router.patch('/post-review/:id', async (req, res) => {
  const { id } = req.params;
  const review = req.body;
  try {
    await Doctor.findOneAndUpdate({ _id: id},
      {
        $push: { reviews: review },
      },
        {useFindAndModify: false }
      );
    return res.status(200).json({message: "Reviews updated!"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: err});
  }
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
  

    return res.json({isValid: true,type: type,result : data});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get any type of User
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const doctor = await Doctor.findById(id);
    if (user) {
      res.json(user);
    }
    else if(doctor) {
      res.json(doctor)
    } else {
      res.status(404).json({ message: 'User or Doctor has been not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

//Create Message post
// Store review to the Doctor schema


module.exports = router;