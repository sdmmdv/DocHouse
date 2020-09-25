const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        min: 2,
        max: 127
    },
    last_name: {
        type: String,
        required: true,
        min: 2,
        max: 127
    },
    email: {
        type: String,
        required: true,
        trim: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model('User', userSchema);