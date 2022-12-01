import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({changeLanguage,language}) => {
  return (
    <div>
      <nav>
        <a href="/">
          <img src={require("../../Assets/logo.png")} alt="" />
        </a>
        <ul id="navul">
          <li>
            {" "}
            <Link to="/track">Track</Link>
          </li>
          <li>
            {" "}
            <Link to="/industry">Industry-Complaint</Link>
          </li>
          <li>
            {" "}
            <Link to="/industryLogin">Industry</Link>
          </li>
          <li>
            {" "}
            <Link to="/Committee">Committee</Link>
          </li>
          <li>
            <Link to="/Municipal">Municipal</Link>
          </li>
        </ul>
        <button onClick={changeLanguage}>Change Language to {language==="English"?"odiya":"English"}</button>
      </nav>
    </div>
  );
};

export default Navbar;
