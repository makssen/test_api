const { Schema, model } = require('mongoose');

const User = new Schema({
    nick: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
}, { timestamps: true });

module.exports = model('User', User);