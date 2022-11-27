import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
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
            <Link to="/Committee">Committee</Link>
          </li>
          <li>
            <Link to="">Municipal</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
