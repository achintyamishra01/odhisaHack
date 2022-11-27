import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "./municipal.css";
import { useNavigate } from "react-router-dom";

const Municipal = () => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
  
    if (e.target.name === "name") {
      setname(e.target.value);
    }
    if (e.target.name === "password") {
      setpassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, password };

    const res = await fetch("/api/signIn", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const c = await res.json();
    console.log(c.success)
    if(c.success){
        localStorage.setItem("municipal",name)
        navigate("/municipalDashboard")
    }
    else{
        alert(c.message)
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div id="cformOuter">
        <div className="complainForm">
          <form action="" method="POST" className="Form" id="compfor">
            <h2>Municipality Login</h2>
            <label htmlFor="name">Choose Municipality</label>
            <select
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Enter ur name"
              className="ipfield"
              onChange={handleChange}
            >
              <option value="">--Select--</option>
              <option value="Bhubaneshwar Municipal Corporation">
                Bhubaneshwar Municipal Corporation
              </option>
              <option value="Cuttack Municipal Corporation">
                Cuttack Municipal Corporation
              </option>
              <option value="Berhampur Municipal Corporation">
                Berhampur Municipal Corporation
              </option>
              <option value="Rourkela Municipal Corporation">
                Rourkela Municipal Corporation
              </option>
              <option value="Sambalpur Municipal Corporation">
                Sambalpur Municipal Corporation
              </option>
            </select>
            <br></br>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              className="ipfield"
              onChange={handleChange}
            />
            <br></br>
            <button onClick={handleSubmit} id="raise">
              Submit
            </button>
          </form>
        </div>
        <div id="pedimg">
          <img src={require("../../Assets/ped.png")} alt="" id="tree" />
        </div>
      </div>
    </div>
  );
};

export default Municipal;
