import React, { Fragment } from "react";
import SidebarItem from "../SidebarItem/SidebarItem";
import "./Sidebar.css";
const Sidebar = (props) => {
  const items = props.posts.map((item, i) => {
    return (
      <SidebarItem
        onMouseEnter={props.onMouseEnter}
        onMouseOut={props.onMouseOut}
        onClick={props.onClick}
        key={i}
        name={item.name}
        streetNumber={item.streetNumber}
        doordashURL={item.doordashURL}
      />
    );
  });
  return <div className="sidebar-container">{items}</div>;
};

export default Sidebar;
