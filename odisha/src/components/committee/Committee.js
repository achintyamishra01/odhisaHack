import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "./committee.css";

const Committee = () => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");

  const handleChange = (e) => {
    console.log(name);
    console.log(password);
    if (e.target.name === "name") {
      setname(e.target.value);
    }
    if (e.target.name === "password") {
      setpassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    console.log(password);
    const data = { name, password };

    const res = await fetch("/api/signIn", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const c = await res.json();
    console.log(c);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div id="cformOuter">
        <div className="complainForm">
          <form action="" method="POST" className="Form" id="compfor">
            <h2>Committee Login</h2>
            {/* <img src={require("../../Assets/form-img.png")} alt="" id="tree" /> */}
            <label htmlFor="name">Choose Committee</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Enter ur name"
              className="ipfield"
              onChange={handleChange}
            />
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
        {/* <div id="pedimg">
          <img src={require("../../Assets/ped.png")} alt="" id="tree" />
        </div> */}
      </div>
    </div>
  );
};

export default Committee;
