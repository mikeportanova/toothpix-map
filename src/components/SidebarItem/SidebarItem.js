import React from "react";
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
      <span className="sidebar-item-name">{props.name}</span>
      <span className="sidebar-item-address">{props.address}</span>
    </div>
  );
};

export default SidebarItem;
