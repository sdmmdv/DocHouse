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
            user_id: String,
            user_name: String
        }
    ]
})


module.exports = mongoose.model('Room', roomSchema);