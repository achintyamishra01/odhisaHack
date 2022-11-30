import React from "react";
import { useEffect, useState } from "react";
import "../complain/complain.css";
import "../committee/committee.css";
import "./industry.css";
import { useNavigate } from "react-router-dom";

const IndustryDashboard = ({ changeLanguage, language }) => {
  const [pendingData, setPendingData] = useState([]);
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("industry_name");
    window.location.reload();
  };

  useEffect(() => {
    if (!localStorage.getItem("industry_name")) {
      navigate("/industryLogin");
    }
    fetchPending();
  }, []);

  const fetchPending = async () => {
    const industry_name = localStorage.getItem("industry_name");
    const data = { industry_name };

    const res = await fetch("/api/fetchPendingIndustryComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const finalRes = await res.json();
    if (finalRes.success) {
      setPendingData(finalRes.data);
    } else {
      alert("No compalains currently");
    }
    console.log(pendingData);
  };

  const renderList = pendingData.map((item, index) => (
    <>
      <div id="indbadadabba">
        <div id="leftdibba">
          <ul id="dashul">
            <li>ID : {item.ticketId}</li>
            <li>Issue : {item.issue}</li>
            <li>Locality : {item.locality}</li>
            <li>Pincode : {item.pincode}</li>
            <li>
              Status :{" "}
              <span>
                <button id="verify" className="accbutt">
                  &#x2713;
                </button>
              </span>
              <span>
                <button id="reject" className="accbutt">
                  &#x2717;
                </button>
              </span>
            </li>
          </ul>
        </div>
        <div id="rightdibba">
          Photo:
          <div id="im">
            <img
              src={"http://localhost:4000/uploads/" + item.myFile}
              id="shikayat"
              alt=""
            />
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  ));

  return (
    <div>
      <div id="gchead">
        <a href="/">
          <img src={require("../../Assets/logo.png")} alt="" />
        </a>
        <div>
          <h2>Industry Name</h2>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div class="ind-dibba">
        <h2>Complain :</h2>
        <br />
        <br />
        {renderList}
      </div>
    </div>
  );
};

export default IndustryDashboard;
