const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
    issue:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    locality:{
        type:String,
        required:true      
    },
    pincode:{
        type:Number,
        required:true
    },
    testImage:{
        data:Buffer,
        contentType: String
    }
})

module.exports = mongoose.model("industrie",industrySchema);