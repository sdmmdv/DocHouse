const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
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


module.exports = mongoose.model('Message', messageSchema);