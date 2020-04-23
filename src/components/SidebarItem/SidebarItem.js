import React, { useState, useEffect } from "react";
import "./SidebarItem.css";

const SidebarItem = (props) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (props.activePost.index === props.post.index) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [props.activePost.index, props.post.index]);
  return (
    <div
      className={active ? "sidebar-item sidebar-item-active" : "sidebar-item"}
      onMouseEnter={props.onMouseEnter}
      onMouseOut={props.onMouseOut}
      onClick={props.onClick}
      id={`sidebar-${props.post.index}`}
    >
      <div className="sidebar-item-data">
        <div className="sidebar-item-name">{props.post.name}</div>
        <div className="sidebar-item-address">{props.post.streetNumber}</div>
      </div>
    </div>
  );
};

export default SidebarItem;
