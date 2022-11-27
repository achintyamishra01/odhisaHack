const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const dotenv = require("dotenv");
const multer = require("multer");
const user = require("../schema/userschema");
const municipal = require("../schema/municipalschema");
const industry = require('../schema/industryschema');
const committee=require("../schema/committeeLogin")

const arr = [
  { 750017: "Bhubaneshwar Municipal Corporation" },
  { 751002: "Bhubaneshwar Municipal Corporation" },
  { 751006: "Bhubaneshwar Municipal Corporation" },
  { 751003: "Bhubaneshwar Municipal Corporation" },
  { 751001: "Bhubaneshwar Municipal Corporation" },
  { 753001: "Cuttack Municipal Corporation" },
  { 753006: "Cuttack Municipal Corporation" },
  { 753002: "Cuttack Municipal Corporation" },
  { 753004: "Cuttack Municipal Corporation" },
  { 753003: "Cuttack Municipal Corporation" },
  { 760001: "Berhampur Municipal Corporation" },
  { 760002: "Berhampur Municipal Corporation" },
  { 760004: "Berhampur Municipal Corporation" },
  { 760005: "Berhampur Municipal Corporation" },
  { 760008: "Berhampur Municipal Corporation" },
  { 769001: "Rourkela Municipal Corporation" },
  { 769002: "Rourkela Municipal Corporation" },
  { 769003: "Rourkela Municipal Corporation" },
  { 769004: "Rourkela Municipal Corporation" },
  { 769005: "Rourkela Municipal Corporation" },
  { 768001: "Sambalpur Municipal Corporation" },
  { 768002: "Sambalpur Municipal Corporation" },
  { 768003: "Sambalpur Municipal Corporation" },
  { 768004: "Sambalpur Municipal Corporation" },
  { 768006: "Sambalpur Municipal Corporation" },
];

require("dotenv").config();

// const client = new twilio(process.env.ACC_SID, process.env.AUTH_TOKEN); // UNCOMMENT THIS

// Storage
let file_name
const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    file_name=Date.now()
    cb(null, Date.now()+file.originalname)
  }
});

const upload = multer({
  storage: Storage,
}).single('testImage')
//*********we need to specify testImage in the field of image in postman************

router.post("/complain", (req, res) => {
  console.log(req.body.pincode);
  let pincode = parseInt(req.body.pincode);
  let phone = parseInt(req.body.phone);
  let municipality = req.body.municipality;
  let ticketId = Date.now();

  const person = user.create({
    name: req.body.name,
    pincode: pincode,
    address: req.body.address,
    e_waste: req.body.e_waste,
    phone: phone,
    gov_com: req.body.gov_com,
    ticketId: ticketId,
    municipality: municipality,
  });
  // send_SMS(phone, ticketId); // UNCOMMENT THIS
  res.status(200).json({
    success: true,
    message:
      "Ticket Generated successfully, and has been sent as an SMS to the phone number provided",
  });
});

router.post("/track", async (req, res) => {
  const ticketId = req.body.ticketId;

  const getData = await user.findOne({ ticketId: ticketId });

  if (getData) {
    res
      .status(200)
      .json({ success: true, data: getData, message: "TicketId found" });
  } else {
    res.status(200).json({ success: true, message: "TicketId doesnot exist" });
  }
});

router.post("/register", async (req, res) => {

  const check = await municipal.findOne({ name: req.body.name });

  if (check == null) {
    const municipal_corp = municipal.create({
      name: req.body.name,
      password: req.body.password
    });

    res.status(200).json({ success: true, message: "Municipal Corporation Created" });

  }else{
    res.status(200).json({success:false,message:"User already exists"});
  }

});
router.post("/signIn", async (req, res) => {
  const municipal_corp = await municipal.findOne({ name: req.body.name });

  if(municipal_corp==null){
    res.status(200).json({success:false,message:"Invalid municipal corporation"});
  }
  else {
    if (municipal_corp.password == req.body.password) {
      res.status(200).json({ success: true, message: "Successfully logged In" });
    }
    else{
      res.status(200).json({success:false,message:"Incorrect Password"});
    }
  }
});
router.post("/registerCommittee",async(req,res)=>{
  const check = await committee.findOne({ email: req.body.email });

  if (check == null) {
    await committee.create({
      email: req.body.email,
      password: req.body.password
    });

    res.status(200).json({ success: true, message: "Governing committee registered" });

  }else{
    res.status(200).json({success:false,message:"Governing committee already registered"});
  }
})
router.post("/signInCommittee",async(req,res)=>{
  const gov_committee = await committee.findOne({ email: req.body.email });
  
  if(gov_committee==null){
    res.status(200).json({success:false,message:"Invalid government committee"});
  }
  else {
    if (gov_committee.password == req.body.password) {
      res.status(200).json({ success: true, message: "Successfully logged In" });
    }
    else{
      res.status(200).json({success:false,message:"Incorrect Password"});
    }
  }
})


function send_SMS(num, ticketId) {
  let mes = `Dear user,  Your request with ticket id : ${ticketId} has been generated succesfully and will be resolved within 3 working days`;
  console.log(mes);
  client.messages
    .create({
      body: mes,
      to: "+91" + num, // Text this number
      from: "+15139604746", // From Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.log(error));
}

router.post("/ticketStatus", async (req, res) => {
  let ticketId = req.body.ticketId;
  console.log(ticketId)
  let d = await user.findOne({ ticketId: ticketId })
  if (!d) {
    res.status(200).json({ success: false, data: null, message: "Ticket is invalid" })
  }
  else {
    res.status(200).json({ success: true, data: d, message: "Ticket is valid" })
  }

});

router.post("/resolve", async (req, res) => {
  let ticketId = req.body.ticketId
  let d = await user.findOneAndUpdate({ ticketId: ticketId }, { gov_com: true })
  if (!d) {
    res.status(200).json({ success: false, data: null, message: "Ticket is invalid" })
  }
  else {
    res.status(200).json({ success: true, data: d, message: "Ticket is pushed to higher authorities" })
  }
})

router.post('/complainIndustry', async (req, res) => {

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      const complain = industry.create({
        issue: req.body.issue,
        name: req.body.name,
        locality: req.body.locality,
        pincode: parseInt(req.body.pincode),
        testImage: {
          data: req.file.filename,
          contentType: 'image/png'
        }
      })

        // check for failure or success
        .then(() => 
        res.status(200).json({ success: true, message: "complain registered for industry" })
        ).catch(err=>console.log(err))
    }
  });

});

router.post("/municipality",async(req,res)=>{
  res.status(200).json({success:true,data:arr,message:"data sent"})
})
router.post("/fetchComplaints",async(req,res)=>{
  
  let municipal=req.body.d

  let d=await user.find({municipality:municipal})
  if(d){
    res.status(200).json({success:true,data:d,message:"complaints fetched"})
  }
  else{
    res.status(200).json({success:false,data:null,message:"error getting complaints"})
  }
})

router.post("/fetchGovComplaints",async(req,res)=>{
  let d=await user.find({gov_com:true})
  if(d){
    res.status(200).json({success:true,data:d,message:"Gov complaints fetched"})
  }
  else{
    res.status(200).json({success:true,data:null,message:"Woo! no complaints there"})
  }
})

module.exports = router;