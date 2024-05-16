const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
collection_id:{
        type:String,
    required:true
},
    custom_string1_name:{
        type:String,
        required:false
    },
    custom_string2_name:{
        type:String,
        required:false
    },
    custom_string3_name:{
        type:String,
        required:false
    }
});


const Item = mongoose.model('Item', itemSchema);
module.exports = {
    Item,

};