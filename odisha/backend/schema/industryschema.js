const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
    issue:{
        type:String,
        required:true
    },
    industry_name:{
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
    myFile:{
        data:String
    }
})

module.exports = mongoose.model("industrie",industrySchema);