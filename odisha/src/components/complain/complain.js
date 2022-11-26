import React, { useState } from "react";

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
      <form action="" method="POST" className="Form">
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          placeholder="Enter ur name"
          onChange={handleChange}
        />
        <br></br>
        <input
          type="number"
          id="phone"
          name="phone"
          value={phone}
          placeholder="Enter ur phone"
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          placeholder="Enter ur address"
          onChange={handleChange}
        />
        <br></br>
        <input
          type="number"
          id="pincode"
          name="pincode"
          value={pincode}
          placeholder="Enter ur pincode"
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          id="municipality"
          name="municipality"
          value={municipality}
        />
        <label htmlFor="ewastecheckbox">Contains e-Waste</label>
        <input
          type="checkbox"
          value={e_waste}
          onChange={handleChange}
          name="ewastecheckbox"
          id="ewaste"
        />
        <br></br>
        {/* <label>True</label>
  <input type="radio" id="e_waste" name="e_waste" value={e_waste} />
    <br></br>
  <label>False</label>
  <input type="radio" id="e_waste1" name="e_waste" value={e_waste} />
    <br></br>
  <label>True</label>
  <input type="radio" id="gov_com" name="gov_com" value={gov_com} />
    <br></br>
  <label>False</label>
  <input type="radio" id="gov_com1" name="gov_com" value={gov_com} />
    <br></br> */}
        <button onClick={handleSubmit}>Raise Complain</button>
      </form>
    </div>
  );
};

export default Complain;
