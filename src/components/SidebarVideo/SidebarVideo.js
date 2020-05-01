import React, { Fragment } from "react";
import InstagramEmbed from "react-instagram-embed";

const SidebarVideo = (props) => {
  if (props.activePost) {
    return (
      <InstagramEmbed
        url={props.activePost.url}
        maxWidth={320}
        hideCaption={true}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {
          document
            .getElementById(`sidebar-${props.activePost.index.toString()}`)
            .scrollIntoView({ behavior: "smooth", block: "end" });
          console.log("LOADING");
        }}
        onSuccess={() => {
          console.log("LOADED");
        }}
        onAfterRender={() => {
          console.log("RENDERED");
        }}
        onFailure={() => {}}
      />
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default SidebarVideo;
