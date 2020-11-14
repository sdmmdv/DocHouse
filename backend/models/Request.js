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
    creator_name: {
        type: String,
        required: true,
        default: "creator_name"
    },
    receiver_name: {
        type: String,
        required: true,
        default: "receiver_name"
    },
    creator_visibility: {
        type: Boolean,
        required: true,
        default: true
    },
    receiver_visibility: {
        type: Boolean,
        required: true,
        default: true
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
    },
    appointment_fee: {
        type: Number,
        default: 0
    },
    fee_status: {
        type: String,
        default: "unsettled"
    }
})


module.exports = mongoose.model('Request', requestSchema);