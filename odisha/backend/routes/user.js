const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const dotenv = require("dotenv");
const user = require("../schema/userschema");
// const bcrypt = require("bcrypt");

require("dotenv").config();

// const client = new twilio(process.env.ACC_SID, process.env.AUTH_TOKEN); // UNCOMMENT THIS

router.post("/complain", (req, res) => {
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
    ticketId: ticketId,
  });
  //   send_SMS(phone);  // UNCOMMENT THIS

  res
    .status(200)
    .json({
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

function send_SMS(num) {
  client.messages
    .create({
      body: "Hello from Node",
      to: "+91" + num, // Text this number
      from: "+15139604746", // From Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.log(error));
}

module.exports = router;
