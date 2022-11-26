const express = require("express");
const router = express.Router();
const user = require('../schema/userschema')
// const bcrypt = require("bcrypt");

router.post('/complain',(req,res)=>{
    let name = req.body.name;
    let pincode = req.body.pincode;
    let address = req.body.address;
    let e_waste = req.body.e_waste;
    let phone = req.body.phone;
    let gov_com = req.body.gov_com;

    let ticketId = Date.now();

    
})

module.exports = router;