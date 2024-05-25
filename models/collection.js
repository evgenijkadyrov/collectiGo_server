const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    createdAt:{
        type:String,
        required:false
    },
    custom_string1_state:{
        type:Boolean,
        required:false
    },
    custom_string1_name:{
        type:String,
        required:false
    },
    custom_string2_state:{
        type:Boolean,
        required:false
    },
    custom_string2_name:{
        type:String,
        required:false
    },
    custom_string3_state:{
        type:Boolean,
        required:false
    },
    custom_string3_name:{
        type:String,
        required:false
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
});


const Collection = mongoose.model('Collection', collectionSchema);
module.exports = {
    Collection,

};