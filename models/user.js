const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    lastLogin: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    },
    collections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    }]
});

const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    }
});

const Collection = mongoose.model('Collection', collectionSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Collection,
    User
};