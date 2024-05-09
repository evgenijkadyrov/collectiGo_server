const mongoose = require('mongoose');

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
    },
    createdAt:{
        type:String,
        required:false
    }
});

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = {
    Collection,

};