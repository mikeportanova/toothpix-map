import React, { Fragment, useEffect, useState } from "react";
import "./Information.css";

//stuff for Card
import { Card } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import jgold from "../../jgold.jpeg";

const InfoCard = (props) => {
  return (
    <Card className="card">
      <CardContent>
        <Typography className="title" color="textSecondary" gutterBottom>
          {props.post.streetNumber}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {props.post.name}
        </Typography>
        <Typography variant="body2">{props.post.quote}</Typography>
        <Typography variant="caption">
          {props.post.quote && "-Jonathan Gold"}
        </Typography>
      </CardContent>
      {props.post.quote && (
        <CardActions>
          <Button size="small" href={props.post.la_times_link} target="_blank">
            Read More
          </Button>
        </CardActions>
      )}
    </Card>
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
          <InfoCard post={props.post} />
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
