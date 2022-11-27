import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav>
        <img src={require("../../Assets/logo.png")} alt="" />
        <ul id="navul">
          <li>
            {" "}
            <a href="/track">Track</a>
          </li>
          <li>
            {" "}
            <a href="">Committee</a>
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
