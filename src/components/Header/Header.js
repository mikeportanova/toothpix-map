import React, { Fragment } from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="header-container">
      <div className="header-left">David's Dead Dreams</div>
      <div className="header-right">
        From the Director of, ummm, wait who is this guy?
      </div>
    </div>
  );
};

export default Header;
