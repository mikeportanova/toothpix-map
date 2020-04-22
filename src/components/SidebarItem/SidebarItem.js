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
      <div className="sidebar-item-data">
        <div className="sidebar-item-name">{props.name}</div>
        <div className="sidebar-item-address">{props.address}</div>
      </div>
      <a
        href="https://www.doordash.com/business/3113/?utm_source=partner-link&utm_medium=website&utm_campaign=3113&utm_content=white-s"
        target="_blank"
        alt="Order Food Delivery with DoorDash"
        title="Order Food Delivery with DoorDash"
        className="doordash-button-container"
      >
        <div className="doordash-button">Order Food Delivery with DoorDash</div>
      </a>
    </div>
  );
};

export default SidebarItem;
