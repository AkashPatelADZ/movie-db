import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import user_logo from "../../images/user.jpg";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">The Movie DB</div>
      </Link>
      <div className="user-image">
        <img src={user_logo} alt="user.jpg" />
      </div>
    </div>
  );
}

export default Header;
