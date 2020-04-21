import React, { useState } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";

const TOKEN =
  "pk.eyJ1IjoibWlrZXBvcnRhbm92YSIsImEiOiJjazk5YTB3aXYwMHdjM2Rtbml2cnhsOWJlIn0.LXcgnO2r0zLJTvY-IuyuMA";

const Map = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 34.07868,
    longitude: -118.36145,
    zoom: 15,
  });
  const [popup, setPopup] = useState(true);
  return (
    <MapGL
      {...viewport}
      width="auto"
      height="80vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={(nextViewport) => {
        console.log(nextViewport);
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
          <Popup
            latitude={item.latitude}
            longitude={item.longitude}
            closeButton={false}
            closeOnClick={false}
            onClose={() => this.setState({ showPopup: false })}
            anchor="top"
            tipSize={5}
          >
            <div>{item.name}</div>
          </Popup>
        );
      })}
    </MapGL>
  );
};

export default Map;
