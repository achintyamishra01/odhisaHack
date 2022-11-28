import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../complain/complain.css";

const CommitteelDashboard = () => {
  const [data1, setdata1] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("committee")) {
      navigate("/committee");
    }
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const res = await fetch("/api/fetchGovComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    const c = await res.json();

    if (c.data) {
      console.log(c.data);
      setdata1(c.data);
    } else {
      document.getElementById("Gov_complaints").innerHTML =
        "No complaints so far!!!";
    }
  };
  {
    /* <tr>
    <th class="trackh">Issue</th>
    <th class="trackh">Industry Name</th>
    <th class="trackh">Locality</th>
    <th class="trackh">Pincode</th>
    <th class="trackh">Proof</th>
    <th class="trackh">Verify</th>
    <th class="trackh">Resolution</th>
  </tr> */
  }
  const renderList = data1.map((item, index) => (
    <tr>
      <td className="trackd">{item.ticketId}</td>
      <td className="trackd">{item.municipality}</td>
      <td className="trackd">{item.name}</td>
      <td className="trackd">{item.phone}</td>
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
          <h2>Governing Committee Dashboard</h2>
        </div>
      </div>
      <div id="outerdashcom">
        <h2>
          <u>Industry Complaint :</u>
        </h2>
        <div id="Gov_complaints">
          <table class="tab">
            {/* {item.name} {item.address} */}
            <tr>
              <th class="trackh">TicketID</th>
              <th class="trackh">Municipality</th>
              <th class="trackh">Complainee</th>
              <th class="trackh">Phone</th>
              <th class="trackh">Resolution</th>
            </tr>
            {renderList}
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommitteelDashboard;
