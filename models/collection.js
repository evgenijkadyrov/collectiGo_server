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
    },
    custom_string1_state:{
        type:String,
        required:false
    },
    custom_string1_name:{
        type:String,
        required:false
    },
    custom_string2_state:{
        type:String,
        required:false
    },
    custom_string2_name:{
        type:String,
        required:false
    },
    custom_string3_state:{
        type:String,
        required:false
    },
    custom_string3_name:{
        type:String,
        required:false
    }
});

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = {
    Collection,

};