import React, { Fragment, useEffect, useState } from "react";
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
  const [delivering, setDelivering] = useState(false);
  const [hasQuote, setHasQuote] = useState(false);
  console.log(props);
  useEffect(() => {
    if (!props.post.doordashURL == "") {
      setDelivering(true);
    }
  }, [props.post.doordashURL]);
  useEffect(() => {
    if (!props.post.quote) {
      setHasQuote(true);
    }
  }, [props.post.quote]);

  console.log("Doordash URL", props.post.doordashURL);
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
          {/* <div className="quote-container">
            <p className="quote-contents">{props.post.quote}</p>
          </div> */}

          {/* {delivering && (
            <a
              href={props.place.doordashURL}
              target="_blank"
              alt="Order Food Delivery with DoorDash"
              title="Order Food Delivery with DoorDash"
              className="doordash-button-container"
              rel="noopener noreferrer"
            >
              <div className="doordash-button">
                Order Food Delivery with DoorDash
              </div>
            </a>
          )} */}
        </div>
      </div>
    );
  }
  return <Fragment />;
};

export default Information;
