import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "../committee/committee.css";
import { useNavigate } from "react-router-dom";
const IndustryLogin = () => {
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
              id="email"
              name="email"
              value={email}
              placeholder="Enter ur email"
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
      </div>
    </div>
  );
};

export default IndustryLogin;
