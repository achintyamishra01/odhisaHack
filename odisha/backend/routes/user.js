const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const dotenv = require("dotenv");
const user = require("../schema/userschema");
const fs = require("fs");

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
    // e_waste: req.body.e_waste,
    phone: phone,
    // gov_com: req.body.gov_com,
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
router.post("/municipality", async (req, res) => {
  res.status(200).json({ success: true, data: arr, message: "data_sent" });
});

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
router.post("/municipality", async (req, res) => {
  res.status(200).json({ success: true, data: arr, message: "data_sent" });
});
module.exports = router;
