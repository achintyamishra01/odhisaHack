import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../complain/complain.css";

const MunicipalDashboard = () => {
  const [data1, setdata1] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("municipal")) {
      navigate("/municipal");
    }
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const d = localStorage.getItem("municipal");
    const municipal = { d };
    const res = await fetch("/api/fetchComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(municipal),
    });
    const c = await res.json();

    if (c.success) {
      console.log(c.data);
      setdata1(c.data);
    } else {
      alert("something went wrong");
    }
  };

  const renderList = data1.map((item, index) => (
    <tr>
      <td className="trackd">{item.ticketId}</td>
      <td className="trackd">{item.municipality}</td>
      <td className="trackd">{item.name}</td>
      <td className="trackd">{item.address}</td>
      <td className="trackd">{item.pincode}</td>
      <td className="trackd">{item.phone}</td>
      <td className="trackd">{item.status}</td>
      <td className="trackd">
        <button className="resbut">Yes?</button>
      </td>
    </tr>
  ));
  return (
    <div>
      <div id="gchead">
        <a href="/">
          <img src={require("../../Assets/logo.png")} alt="" />
        </a>
        <div>
          <h2>Municipal Dashboard</h2>
        </div>
      </div>
      <div id="outerdashmun">
        <h2>
          <u>Civilian Requests :</u>
        </h2>
        <div id="complaints">
          <table class="tab">
            <tr>
              <th className="trackh">TicketID</th>
              <th className="trackh">Municipality</th>
              <th className="trackh">Compalainee</th>
              <th className="trackh">Address</th>
              <th className="trackh">Pincode</th>
              <th className="trackh">Phone</th>
              <th className="trackh">Status</th>
              <th className="trackh">resolved</th>
            </tr>
            {renderList}
          </table>
        </div>
      </div>
    </div>
  );
};

export default MunicipalDashboard;
