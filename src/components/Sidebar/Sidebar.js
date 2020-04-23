import React from "react";
import SidebarItem from "../SidebarItem/SidebarItem";
import "./Sidebar.css";
const Sidebar = (props) => {
  const items = props.posts.map((item, i) => {
    return (
      <SidebarItem
        onMouseEnter={props.onMouseEnter}
        onMouseOut={props.onMouseOut}
        onClick={props.onClick}
        key={item.index}
        post={item}
        name={item.name}
        index={item.index}
        streetNumber={item.streetNumber}
        doordashURL={item.doordashURL}
        activePost={props.activePost}
      />
    );
  });
  return <div className="sidebar-items-list">{items}</div>;
};

export default Sidebar;
