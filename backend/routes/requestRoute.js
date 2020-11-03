const bcrypt = require('bcrypt');
const express = require('express');
const auth = require('../middleware/auth');
const Request = require('../models/Request');

const router = new express.Router();

router.post("/create-request", auth, async (req, res) => {
const newRequest = new Request({
    creator_id: req.body.creator_id,
    receiver_id: req.body.receiver_id,
    creator_name: req.body.creator_name,
    receiver_name: req.body.receiver_name,
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
    const requests = await Request.find({creator_id: creator_id, status: status, creator_visibility: true});
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Request by Receiver_id (Doctor ID)
router.get('/doctor-request/',auth, async (req, res) => {
  const {receiver_id, status} = req.query;
  try {
    const requests = await Request.find({receiver_id: receiver_id, status: status, receiver_visibility: true});
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update User Request visibility (Delete item from UI)
router.patch('/hide_creator/:id', auth, async (req, res) => {
  const {id} = req.params;
  try {
    await Request.findOneAndUpdate({_id: id},
      {
        $set: {
          creator_visibility: req.body.creator_visibility,
        }
      },
      {useFindAndModify: false}
    );
    return res.status(200).json({message: "Successfully changed!"});
  } catch (err) {
    return res.status(500).json({message: err});
  }
});

// Update Doctor Request visibility (Delete item from UI)
router.patch('/hide_receiver/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Request.findOneAndUpdate({ _id: id},
      {
        $set: {
          receiver_visibility: req.body.receiver_visibility,
        }
      },
      {useFindAndModify: false}
    );
    return res.status(200).json({message: "Successfully changed!"});
  } catch (err) {
    return res.status(500).json({message: err});
  }
});

// Doctor Accept request
router.patch('/accept/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Request.findOneAndUpdate({ _id: id},
      {
        $set: {
          status: req.body.status,
        }
      },
      {useFindAndModify: false}
    );
    return res.status(200).json({message: "Request accepted!"});
  } catch (err) {
    return res.status(500).json({message: err});
  }
});


// Doctor Delete request
router.patch('/reject/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Request.findOneAndUpdate({ _id: id},
      {
        $set: {
          status: req.body.status,
        }
      },
      {useFindAndModify: false}
    );
    return res.status(200).json({message: "Request deleted!"});
  } catch (err) {
    return res.status(500).json({message: err});
  }
});



module.exports = router;