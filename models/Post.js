const { Schema, model } = require('mongoose');

const Post = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = model('Post', Post);