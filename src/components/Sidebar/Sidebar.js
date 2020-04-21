import React, { Fragment } from "react";
import SidebarItem from "../SidebarItem/SidebarItem";
const List = (props) => {
  const items = props.posts.map((item, i) => {
    return (
      <SidebarItem
        onMouseEnter={props.onMouseEnter}
        onMouseOut={props.onMouseOut}
        onClick={props.onClick}
        key={i}
        name={item.name}
        address={item.address}
      />
    );
  });
  return <div className="sidebar-container">{items}</div>;
};

export default List;
