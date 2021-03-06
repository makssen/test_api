const { Schema, model } = require('mongoose');

const User = new Schema({
    nick: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        ref: 'Role'
    }]
}, { timestamps: true });

module.exports = model('User', User);