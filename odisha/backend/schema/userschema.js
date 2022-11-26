const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    ticketId:{
        type:String,
    },
    name: {
        type: String,
        required: true
    },
    pincode:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    e_waste:{
        type:Boolean,
        default:false
    },
    phone:{
        type:Number,
        required:true
    },
    gov_com:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model("odisha",UserSchema );