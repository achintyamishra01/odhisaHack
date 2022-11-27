import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "./complain.css";

const Complain = () => {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [e_waste, sete_waste] = useState(false);
  const [gov_com, setgov_com] = useState(false);
  const [municipality, setmunicipality] = useState("");

  const autoComplete = async (pin) => {
    const d = await fetch("/api/municipality", {
      method: "POST",
      headers: {
        //always use this
        "content-type": "application/json",
      },
    });
    const c = await d.json();

    for (let index = 0; index < c.data.length; index++) {
      for (const [key, val] of Object.entries(c.data[index])) {
        if (pin === key) {
          console.log("hi");
          setmunicipality(val);
        }
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setname(e.target.value);
    }
    if (e.target.name === "phone") {
      setphone(e.target.value);
    }
    if (e.target.name === "address") {
      setaddress(e.target.value);
    }
    if (e.target.name === "ewastecheckbox") {
      sete_waste(e.target.checked);
    }
    if (e.target.name === "pincode") {
      setpincode(e.target.value);
      if (e.target.value.length === 6) {
        console.log(e.target.value);
        autoComplete(e.target.value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pincode);
    console.log(phone);
    console.log(municipality);
    console.log(name);
    console.log(e_waste);
    const ele = { name, phone, address, pincode, municipality, e_waste };

    const res = await fetch("/api/complain", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ele),
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
            <h2>Service Request</h2>
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
            <input
              type="number"
              id="phone"
              name="phone"
              value={phone}
              placeholder="Enter ur phone"
              className="ipfield"
              onChange={handleChange}
            />
            <br></br>
            <textarea
              type="text"
              id="address"
              name="address"
              value={address}
              placeholder="Enter ur address"
              className="ipfield"
              onChange={handleChange}
            />
            <br></br>
            <input
              type="number"
              id="pincode"
              name="pincode"
              value={pincode}
              placeholder="Enter ur pincode"
              className="ipfield"
              onChange={handleChange}
            />
            <br></br>
            <input
              type="text"
              id="municipality"
              name="municipality"
              className="ipfield"
              value={municipality}
            />
            <br />
            <div id="cbox">
              <span>
                <label htmlFor="ewastecheckbox">Contains e-Waste</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  value={e_waste}
                  onChange={handleChange}
                  name="ewastecheckbox"
                  id="ewaste"
                />
              </span>
            </div>
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

export default Complain;
