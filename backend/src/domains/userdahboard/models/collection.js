const mongoose = require('mongoose');

const CollectionSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    }
})

module.exports = mongoose.model('collections', CollectionSchema)