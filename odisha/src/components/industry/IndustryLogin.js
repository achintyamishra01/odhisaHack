import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "../committee/committee.css";
import { useNavigate } from "react-router-dom";

const IndustryLogin = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleChange = (e)=>{
        if(e.target.name === "name"){
            setEmail(e.target.value);
        }
        else if(e.target.name === "password"){
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        console.log(email);
        console.log(password);
    }

    return (
        <div>
            <Navbar></Navbar>
            <div id="cformOuter">
                <div className="complainForm">
                    <form action="" method="POST" className="Form" id="compfor">
                        <h2>Industry Login</h2>
                        <label htmlFor="name">Username:</label>
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
