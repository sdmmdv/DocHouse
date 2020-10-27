const bcrypt = require('bcrypt');
const express = require('express');
const auth = require('../middleware/auth');
const Request = require('../models/Request');

const router = new express.Router();

router.post("/create-request", async (req, res) => {

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



module.exports = router;