import React, { useState } from "react";
import "./track.css";

const Track = () => {
  var ticket, status, address, name, pin;
  const [ticketId, setticketId] = useState("");
  const handleChange = (e) => {
    if (e.target.name === "complaint_Ticket") {
      setticketId(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ele = { ticketId };
    console.log(ticketId);
    const res = await fetch("/api/ticketStatus", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ele),
    });

    const c = await res.json();
    console.log(c.data);
    ticket = c.data.ticketId;
    status = c.data.status;
    name = c.data.name;
    address = c.data.address;
    pin = c.data.pincode;
    let tab = document.getElementById("tab");
    console.log(tab);
    tab.innerHTML = `<tr>
    <th class="trackh">TicketID</th>
    <th class="trackh">Name</th>
    <th class="trackh">Address</th>
    <th class="trackh">Pincode</th>
    <th class="trackh">Status</th>
  </tr>
  <tr>
    <td class="trackd">${ticket}</td>
    <td class="trackd">${name}</td>
    <td class="trackd" id="trackaddr">
      ${address}
    </td>
    <td class="trackd">${pin}</td>
    <td class="trackd">${status}</td>
  </tr>`;
  };

  const handleResolve = async () => {
    if (!ticketId) {
      alert("please enter the ticket id");
    } else {
      var dateCreated = new Date(parseInt(ticketId)); //in normal format
      var currentDate = Date.now(); //in milliseconds
      console.log(dateCreated.toString());
      var dateDifference = parseInt(currentDate) - parseInt(ticketId);
      if (dateDifference > 36000000) {
        const ele = { ticketId };
        const res = await fetch("/api/resolve", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(ele),
        });

        const c = await res.json();
        alert(c.message);
      } else {
        alert(
          "please wait until the estimated time is there to solve the complaint"
        );
      }
    }
  };

  return (
    <div id="badadibba">
      <div className="form-container">
        <form className="Form">
          <input
            type="text"
            name="complaint_Ticket"
            id="complaint_Ticket"
            placeholder="Enter ticket id u want to track"
            onChange={handleChange}
          />
          <button onClick={handleSubmit} id="trs">
            Track
          </button>
        </form>
      </div>
      <table class="tab"></table>
      <button onClick={handleResolve} id="upperauth">
        Push to higher authorities
      </button>
    </div>
  );
};

export default Track;
