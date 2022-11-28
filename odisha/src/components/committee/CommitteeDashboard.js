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
  const renderList = data1.map((item, index) => (
    <table>
      {/* {item.name} {item.address} */}
      <tr>
        <th class="trackh">TicketID</th>
        <th class="trackh">Municipality</th>
        <th class="trackh">Compalainee</th>
        <th class="trackh">Locality</th>
        <th class="trackh">Pincode</th>
        <th class="trackh">Phone</th>
        <th class="trackh">Status</th>
        <th class="trackh">resolved</th>
      </tr>
      <tr>
        <td class="trackd">{item.name}</td>
        <td class="trackd">Industry Name</td>
        <td class="trackd">Locality</td>
        <td class="trackd">Pincode</td>
        <td class="trackd">Proof</td>
        <td class="trackd">Verify</td>
      </tr>
    </table>
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
        <div id="Gov_complaints">{renderList}</div>
      </div>
    </div>
  );
};

export default CommitteelDashboard;
