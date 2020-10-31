const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    creator_id: {
        type: String,
        required: true,
    },
    receiver_id: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending"
    }
})


module.exports = mongoose.model('Request', requestSchema);