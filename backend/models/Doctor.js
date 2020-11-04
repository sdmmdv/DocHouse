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
    speciality: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 6,
        max: 255
    },
    bio: {
        type: String,
        default: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley oftype and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
    },
    web: {
        type: String,
        default: 'www.web.com'
    },
    address: {
        type: String,
        default: 'Default avenue, Red street 5'
    },
    reviews: {
        type: [{author : String, opinion : String, rating: Number}]
    },
    date: {
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model('Doctor', doctorSchema);