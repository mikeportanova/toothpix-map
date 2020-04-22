import React, { Fragment } from "react";

const SidebarVideo = (props) => {
  if (props.activePost) {
    return <div className="sidebar-video">{props.activePost.post}</div>;
  } else {
    return <Fragment></Fragment>;
  }
};

export default SidebarVideo;
