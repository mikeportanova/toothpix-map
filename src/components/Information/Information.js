import React, { Fragment } from "react";
import "./Information.css";
import jgold from "../../jgold.jpeg";

const Location = (props) => {
  return (
    <div className="info-left-container">
      <span className="info-address">{props.post.address}</span>
      <span className="info-title">{props.post.name}</span>
      <span className="info-quote">{props.post.quote}</span>
      <span className="info-quote-gold">
        {props.post.quote && "- Jonathan Gold"}
      </span>
    </div>
  );
};

const Information = (props) => {
  if (props.post) {
    return (
      <div className="information-box">
        <div className="info-left">
          <Location post={props.post} />
        </div>
        <div className="info-right">
          {props.post.quote && (
            <div className="gold-image-container">
              <img className="gold-image" src={jgold} alt="" />
            </div>
          )}
        </div>
      </div>
    );
  }
  return <Fragment />;
};

export default Information;
