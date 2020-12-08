const router = require('express').Router();
const auth = require('../middleware/auth');
const Room = require('../models/Room');
const ObjectId = require('mongodb').ObjectID;


// Create new a message
router.post('/messages/new', async (req, res) => {
  try {
      const newMessage = {
        message: req.body.message,
        author: req.body.author,
        author_id: req.body.author_id,
        timestamp: req.body.timestamp,
        room_id: req.body.room_id
      }
    

    Room.updateOne(
        {_id: req.body.room_id},
        {$push: {messages: newMessage}},
        function(err, data) {
          if(err) console.log(err);
          // console.log(data);
        }
    );

    res.status(201).json('savedMessage');
  } catch (err) {
    console.log(err);
    res.status(500).json({err});
  }
});

// Create new a room
router.post('/rooms/new', async (req, res) => {

  try {

    const room = await Room.find({ $and: [ 
      { members : { $elemMatch : { user_id: req.body.members[0].user_id } } },   
      { members : { $elemMatch : { user_id: req.body.members[1].user_id } } } ]});

    console.log(room);
    
    if (room.length > 0) {
      return res.status(200).json(room[0]);
    }

    const newRoom = new Room({
        members: req.body.members
    });
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    console.log(err);
    res.status(500).json({err});
  }
});

// Get all the rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({err});
  }
});

// Get a room by a user ID
router.get('/rooms/user/:id', async (req, res) => {
  const {id} = req.params;
  try {
    // const doctor = await Doctor.findById(id);
    const rooms = await Room.find(
      {"members.user_id": ObjectId(id)},
    );
    
    if (rooms) {
        res.status(200).json(rooms);
    } else {
      res.status(404).json({ message: 'Room has been not found!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});


//Get room name by id
router.get('/rooms/:roomId', async (req, res) => {
  const {roomId} = req.params;
  try {
    const room = await Room.findById(roomId);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: 'Room has been not found!' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;