const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    last_name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    phone_number: {
        type: String,
        required: true,
        max: 16
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model('Doctor', doctorSchema);