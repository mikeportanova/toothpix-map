import React from "react";
import InstagramEmbed from "react-instagram-embed";
import "./Post.css";

const Post = (props) => {
  return (
    <div onMouseEnter={props.onMouseEnter} id={props.name}>
      <InstagramEmbed
        url={props.url}
        maxWidth={320}
        hideCaption={true}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
    </div>
  );
};

export default Post;
