const express = require("express");
const router = express.Router();
const user = require('../schema/userschema')
// const bcrypt = require("bcrypt");

const arr=[
    {"750017":"Bhubaneshwar Municipal Corporation"},
   
    {"768006":"Sambalpur Municipal Corporation"}
    
]
router.post('/complain', (req, res) => {

    let pincode = parseInt(req.body.pincode);
    let phone = parseInt(req.body.phone);
    let ticketId = Date.now();

    const person = user.create({
        name: req.body.name,
        pincode: pincode,
        address: req.body.address,
        e_waste: req.body.e_waste,
        phone: phone,
        gov_com: req.body.gov_com,
        ticketId: ticketId
    });

    res.status(200).json({ success: true, message: "User registered successfully" });

})

router.post('/track', async (req, res) => {
    const ticketId = req.body.ticketId;

    const getData = await user.findOne({ ticketId: ticketId });

    if (getData) {
        res.status(200).json({ success: true, data: getData, message: "TicketId found" });
    }
    else {
        res.status(200).json({ success: true, message: "TicketId doesnot exist" });
    }
});
router.post("/municipality",async(req,res)=>{
    res.status(200).json({success:true,data:arr,message:"data_sent"})
});
 

module.exports = router;