import React, { useState, useEffect } from "react";
import "./SidebarItem.css";

const SidebarItem = (props) => {
  return (
    <div
      className="sidebar-item"
      onMouseEnter={props.onMouseEnter}
      onMouseOut={props.onMouseOut}
      onClick={props.onClick}
      id={props.name}
    >
      <div className="sidebar-item-data">
        <div className="sidebar-item-name">{props.name}</div>
        <div className="sidebar-item-address">{props.streetNumber}</div>
      </div>
    </div>
  );
};

export default SidebarItem;
