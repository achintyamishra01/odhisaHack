import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "./municipal.css";

const Municipal = () => {
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
