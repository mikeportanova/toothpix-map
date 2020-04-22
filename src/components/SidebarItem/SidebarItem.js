import React, { useState, useEffect } from "react";
import "./SidebarItem.css";

const SidebarItem = (props) => {
  const [delivering, setDelivering] = useState(false);
  useEffect(() => {
    if (!props.doordashURL == "") {
      setDelivering(true);
      console.log("sidebarItem log");
    }
  }, [props.doordashURL]);
  console.log("Doordash URL", props.doordashURL);
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
      {delivering && (
        <a
          href={props.doordashURL}
          target="_blank"
          alt="Order Food Delivery with DoorDash"
          title="Order Food Delivery with DoorDash"
          className="doordash-button-container"
        >
          <div className="doordash-button">
            Order Food Delivery with DoorDash
          </div>
        </a>
      )}
    </div>
  );
};

export default SidebarItem;
