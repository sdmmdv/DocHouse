const router = require('express').Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');


// Create new a message
router.post('/new', async (req, res) => {

  try {
      const newMessage = new Message({
        message: req.body.message,
        author: req.body.author,
        timestamp: req.body.timestamp,
        received: req.body.received
      });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({err});
  }
});


// Get all the messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({err});
  }
});

module.exports = router;