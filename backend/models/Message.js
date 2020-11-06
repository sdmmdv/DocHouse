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
    timestamp: {
        type: String,
        required: true,
    },
    received: {
        type: Boolean,
        required: true,
    }
})


module.exports = mongoose.model('Message', messageSchema);