const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    messages: [
        {
            type: Object,
            ref: 'Message'
        }
    ],
    members: [
        {
            type: String,
            required: true
        }
    ]
})


module.exports = mongoose.model('Room', roomSchema);