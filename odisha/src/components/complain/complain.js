import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "./complain.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Complain = ({ changeLanguage, language }) => {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [e_waste, sete_waste] = useState(false);
  const [gov_com, setgov_com] = useState(false);
  const [municipality, setmunicipality] = useState("");
  const [complain,setComplain] = useState("");

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
    if(e.target.name== "complain"){
      setComplain(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(complain);
    const ele = { name, phone, address, pincode, municipality, e_waste ,complain};

    if (name.length === 0 || phone.length === 0 || address.length === 0 || pincode.length === 0
      || municipality.length === 0 || complain.length ===0) {
      toast.error('All inputs are required', {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      const res = await fetch("/api/complain", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(ele),
      });
      const c = await res.json();
      console.log(c);
      setaddress("");
      setmunicipality("");
      setphone("");
      setpincode("");
      setname("");
      setComplain("");
      toast.success('Complain Filed.TicketId sent to your mobile number', {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <Navbar changeLanguage={changeLanguage} language={language}></Navbar>
        <div id="cformOuter">
          <div className="complainForm">
            <form action="" method="POST" className="Form" id="compfor">
              <h2>
                {language === "English" ? "Service Request" : "ସେବା ଅନୁରୋଧ"}
              </h2>

              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder={language === "English" ? "Name" : "ନାମ"}
                className="ipfield"
                onChange={handleChange}
              />
              <br></br>
              <input
                type="number"
                id="phone"
                name="phone"
                value={phone}
                placeholder={language === "English" ? "phone" : "ଫୋନ୍ |"}
                className="ipfield"
                onChange={handleChange}
              />
              <br></br>
              <textarea
                type="text"
                id="address"
                name="address"
                value={address}
                placeholder={language === "English" ? "address" : " ଠିକଣା"}
                className="ipfield"
                onChange={handleChange}
              />
              <br></br>
              <input
                type="number"
                id="pincode"
                name="pincode"
                value={pincode}
                placeholder={language === "English" ? "pincode" : "ପିଙ୍କୋଡ୍"}
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
                placeholder={
                  language === "English"
                    ? "Municipal Corportion"
                    : "ମ୍ୟୁନିସିପାଲିଟି କର୍ପୋରେସନ୍"
                }
              />
              <br />

              {/* Added dropdown for type of complain */}

              <select
              type="text"
              id="complain"
              name="complain"
              value={complain}
              placeholder={language === "odiya" ? "ନାମ" : "Name"}
              className="ipfield"
              onChange={handleChange}
            >
              <option value="">
                --{language === "odiya" ? "ଚୟନ କରନ୍ତୁ" : "Select Issue"}--
              </option>
              <option value="Garbage Pickup">
                {language === "odiya"
                  ? "ଆବର୍ଜନା ପିକଅପ୍"
                  : "Garbage Pickup"}
              </option>
              <option value="Drainage">
                {language === "odiya"
                  ? "ଜଳ ନିଷ୍କାସନ"
                  : "Drainage"}
              </option>
              <option value="Sewage">
                {language === "odiya"
                  ? "ଜଳ ନିଷ୍କାସନ"
                  : "Sewage"}
              </option>
              <option value="Sanitation">
                {language === "odiya"
                  ? "ପରିମଳ"
                  : "Sanitation"}
              </option>
            </select>

              <a href="http://localhost:5000/" target="_blank" id="ai">
                {
                  language === "English"
                    ? "Check If your waste is e-Waste"
                    : "ଆପଣଙ୍କର ବର୍ଜ୍ୟବସ୍ତୁ ଇ-ଆବର୍ଜନା କି ନାହିଁ ଯାଞ୍ଚ କରନ୍ତୁ "
                }
              </a>
              <div id="cbox">
                <span>
                  <label htmlFor="ewastecheckbox">
                    {language === "English"
                      ? "Contains e-Waste ?"
                      : "ଇବର୍ଜ୍ୟବସ୍ତୁ"}
                  </label>
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
                {language === "English" ? "Submit" : "ଦାଖଲ କରନ୍ତୁ |"}
              </button>
            </form>
          </div>
          <div id="pedimg">
            <img src={require("../../Assets/ped.png")} alt="" id="tree" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Complain;