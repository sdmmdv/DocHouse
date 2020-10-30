const bcrypt = require('bcrypt');
const express = require('express');
const auth = require('../middleware/auth');
const Request = require('../models/Request');

const router = new express.Router();

router.post("/create-request", auth, async (req, res) => {

const newRequest = new Request({
    creator_id: req.body.creator_id,
    receiver_id: req.body.receiver_id,
    subject: req.body.subject,
    explanation: req.body.explanation,
    time: req.body.time,
    });  
  try {
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get Request by Creator_id (User ID)
router.get('/user-request/',auth, async (req, res) => {
  const {creator_id, status} = req.query;
  try {
    const requests = await Request.find({creator_id: creator_id, status: status});
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Request by Receiver_id (Doctor ID)
router.get('/doctor-request/',auth, async (req, res) => {
  const {receiver_id} = req.query;
  try {
    const requests = await Request.find({receiver_id: receiver_id});
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;