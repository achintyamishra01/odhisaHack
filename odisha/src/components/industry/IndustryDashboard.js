import React from "react";
import { useEffect, useState } from "react";
import "../complain/complain.css";
import "../committee/committee.css";
import "./industry.css";

const IndustryDashboard = () => {
  return (
    <div>
      <div id="gchead">
        <a href="/">
          <img src={require("../../Assets/logo.png")} alt="" />
        </a>
        <div>
          <h2>Industry Name</h2>
          <button>Logout</button>
        </div>
      </div>
      <div class="ind-dibba">
        <h2>Complain :</h2>
        <br />
        <br />
        <div id="indbadadabba">
          <div id="leftdibba">
            <ul id="dashul">
              <li>ID : 76782816990</li>
              <li>Issue : Dumping waste in River</li>
              <li>Locality : Anant Vihar</li>
              <li>Pincode : 750001</li>
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
            <div id="im"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryDashboard;
