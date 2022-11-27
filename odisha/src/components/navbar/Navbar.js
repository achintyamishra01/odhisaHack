import React from "react";
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
            <a href="/track">Track</a>
          </li>
          <li>
            {" "}
            <a href="/Committee">Committee</a>
          </li>
          <li>
            <a href="">Municipal</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
