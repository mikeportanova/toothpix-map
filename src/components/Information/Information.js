import React, { Fragment, useEffect, useState } from "react";
import "./Information.css";

const Information = (props) => {
  const [delivering, setDelivering] = useState(false);

  useEffect(() => {
    if (!props.place.doordashURL == "") {
      setDelivering(true);
      console.log("sidebarItem log");
    }
  }, [props.place.doordashURL]);

  console.log("Doordash URL", props.place.doordashURL);
  if (props.place) {
    return (
      <div className="information-box">
        <div className="info-left">
          <h1>{props.place.name}</h1>
          <h2>{props.place.address}</h2>
        </div>
        <div className="info-right"></div>
        {delivering && (
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
        )}
      </div>
    );
  }
  return <Fragment />;
};

export default Information;
