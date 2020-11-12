const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    author_id: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    room_id: {
        type: String,
        reuired: true
    }
})

const roomSchema = new mongoose.Schema({
    messages: [
        Message
    ],
    members: [
        {
            user_id: String,
            user_name: String
        }
    ]
})


module.exports = mongoose.model('Room', roomSchema);