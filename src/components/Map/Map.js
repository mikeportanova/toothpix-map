import React, { useState, useEffect } from "react";
import MapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import { easeCubic } from "d3-ease";
import pin from "../../dave-pin.png";

const TOKEN =
  "pk.eyJ1IjoiZGdyZWVuMTIzNDUiLCJhIjoiY2s5YzlraGU1MDJiYjNucXJwMnloMjM5bSJ9.aNnwPqxMlBqMGp9SU6dxfQ";

const Map = (props) => {
  let initialState = {};
  props.posts.forEach((item) => (initialState[item.name] = false));

  const [viewport, setViewport] = useState({
    latitude: 34.07868,
    longitude: -118.36145,
    zoom: 10,
  });
  const [clickedMarker, setClickedMarker] = useState({ ...initialState });

  const handleClick = (e) => {
    e.preventDefault();
    setClickedMarker((prevState) => {
      return { ...prevState, [e.target.id]: true };
    });
    console.log("logging click!", e.target.id);
    console.log(clickedMarker);
  };

  // have it update viewport if activePost is set.
  useEffect(() => {
    if (props.activePost) {
      setViewport((prevState) => {
        return {
          ...prevState,
          latitude: props.activePost.latitude,
          longitude: props.activePost.longitude,
          zoom: 11,
          transitionDuration: 2000,
          transitionInterpolator: new FlyToInterpolator(),
          transitionEasing: easeCubic,
        };
      });
      console.log("Active Post", props.activePost);
    }
  }, [props.activePost]);

  return (
    <MapGL
      {...viewport}
      logoPosition="bottom-right"
      width="100%"
      height="625px"
      mapOptions={{
        attributionControl: false,
        logoPosition: "bottom-right",
      }}
      mapStyle="mapbox://styles/dgreen12345/ck9c9owoa0ccq1il7wqo4bunx"
      onViewportChange={(nextViewport) => {
        setViewport(nextViewport);
      }}
      mapboxApiAccessToken={TOKEN}
    >
      {/* {props.posts.map((item, i) => {
        return (
          <Marker key={i} latitude={item.latitude} longitude={item.longitude}>
            {item.name}
          </Marker>
        );
      })} */}
      {props.posts.map((item, i) => {
        return (
          <Marker latitude={item.latitude} longitude={item.longitude} key={i}>
            <div
              id={`marker-${item.index}`}
              className={
                item.index === props.hoveredPost.index
                  ? "mapMarkerStyle mapMarkerStyleHovered"
                  : "mapMarkerStyle"
              }
              onClick={props.handleMarkerClick}
              onMouseOver={props.handleMarkerHover}
              onMouseOut={props.onMouseOut}
            >
              <img src={pin} alt="" height="auto" width="38px" />
            </div>
          </Marker>
        );
      })}
      {props.activePost && (
        <Popup
          latitude={props.activePost.latitude}
          longitude={props.activePost.longitude}
          closeButton={false}
          closeOnClick={false}
          onClose={() => this.setState({ showPopup: false })}
          anchor="left"
          offsetLeft={40}
          offsetTop={18}
          tipSize={5}
        >
          <div
            id={`popup-${props.activePost.index}`}
            className="popup-content"
            style={{ width: "auto", height: "auto" }}
            onClick={handleClick}
          >
            <span id="popup-name">{props.activePost.name}</span>
            <span id="popup-address">{props.activePost.streetNumber}</span>
          </div>
        </Popup>
      )}
    </MapGL>
  );
};

export default Map;
