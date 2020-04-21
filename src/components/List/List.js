import React, { Fragment } from "react";
import Post from "../Post/Post";
import "./List.css";

const List = (props) => {
  const items = props.posts.map((item, i) => {
    return (
      <Post
        onMouseEnter={props.onMouseEnter}
        className="post-item"
        url={item.url}
        key={i}
        name={item.name}
      />
    );
  });
  return <div className="list-container">{items}</div>;
};

export default List;
