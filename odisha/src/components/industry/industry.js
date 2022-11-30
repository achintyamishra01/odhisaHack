import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "./industry.css";

function Industry({changeLanguage,language}) {
  const [issue, setIssue] = useState("");
  const [industry_name, setIndustry_name] = useState("");
  const [locality, setLocality] = useState("");
  const [pincode, setPincode] = useState("");
  const [image, setImage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { issue, industry_name, locality, pincode, image };

    const res = await fetch("/api/complainIndustry", {
      method: "POST",
      headers: { 
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const content = await res.json();
    console.log(content);
  };

  const handleChange = (e) => {
    if (e.target.name === "issue") {
      setIssue(e.target.value);
    }
    if (e.target.name === "industry_name") {
      setIndustry_name(e.target.value);
    }
    if (e.target.name === "locality") {
      setLocality(e.target.value);
    }
    if (e.target.name === "pincode") {
      setPincode(e.target.value);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div id="form-cont">
        <form
          method="POST"
          action="/api/complainIndustry"
          encType="multipart/form-data"
          id="ind-comp-form"
        >
          <h2>Industry Complaint</h2>
          <textarea
            type="text"
            id="issue"
            name="issue"
            value={issue}
            placeholder="Enter ur address"
            className="ipfield"
            onChange={handleChange}
          />
          <input
            type="text"
            id="industry_name"
            name="industry_name"
            value={industry_name}
            placeholder="Enter your industry name"
            className="ipfield"
            onChange={handleChange}
          />
          <input
            type="text"
            id="locality"
            name="locality"
            value={locality}
            placeholder="Enter your industry locality"
            className="ipfield"
            onChange={handleChange}
          />
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={pincode}
            placeholder="Enter industry pincode area:"
            className="ipfield"
            onChange={handleChange}
          />
          <div id="fup">
            <label htmlFor="image">Attach a proof : </label>
            <input
              type="file"
              id="testImage"
              name="image"
              placeholder="Enter industry pincode area:"
            />
          </div>
          <input type="submit" id="icbut" />
        </form>
      </div>
    </div>
  );
}

export default Industry;
