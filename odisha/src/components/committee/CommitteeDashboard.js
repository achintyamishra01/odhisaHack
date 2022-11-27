import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../complain/complain.css";

const CommitteelDashboard = () => {
  const [data1, setdata1] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    //   if(!localStorage.getItem("municipal")){
    //     navigate("/municipal")
    //   }
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
    <p>
      {item.name} {item.address}
    </p>
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
        <table id="Gov_complaints">{renderList}</table>
      </div>
    </div>
  );
};

export default CommitteelDashboard;
