import React, { useState, useEffect } from "react";
import MapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import "./App.css";
import List from "./components/List/List";
// import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import Post from "./components/Post/Post";
import logo from "./piggy-bank-facing-right.svg";

const toothpix = [
  {
    url: "https://www.instagram.com/p/BVH0cADD3GP/?utm_source=mp-toothpix",
    latitude: 34.07868,
    longitude: -118.36145,
    name: "Canter's Deli",
    post: (
      <Post url="https://www.instagram.com/p/BVH0cADD3GP/?utm_source=mp-toothpix" />
    ),
  },
  {
    url: "https://www.instagram.com/p/BVCn3cODquO/?utm_source=mp-toothpix",
    latitude: 34.079182,
    longitude: -118.361717,
    name: "Animal Restaurant",
    post: (
      <Post url="https://www.instagram.com/p/BVCn3cODquO/?utm_source=mp-toothpix" />
    ),
  },
  {
    url: "https://www.instagram.com/p/BU9iIV1DiH8/?utm_source=mp-toothpix",
    latitude: 34.07929,
    longitude: -118.3614,
    name: "Cofax",
    post: (
      <Post url="https://www.instagram.com/p/BU9iIV1DiH8/?utm_source=mp-toothpix" />
    ),
  },
  {
    url: "https://www.instagram.com/p/BUhJXvXjA4f/?utm_source=mp-toothpix",
    latitude: 34.0843865,
    longitude: -118.2915498,
    name: "Papa John's Pizza",
    post: (
      <Post url="https://www.instagram.com/p/BUhJXvXjA4f/?utm_source=mp-toothpix" />
    ),
  },
];

const TOKEN =
  "pk.eyJ1IjoibWlrZXBvcnRhbm92YSIsImEiOiJjazk5YTB3aXYwMHdjM2Rtbml2cnhsOWJlIn0.LXcgnO2r0zLJTvY-IuyuMA";

const Map = (props) => {
  let initialState = {};
  toothpix.forEach((item) => (initialState[item.name] = false));

  const [viewport, setViewport] = useState({
    latitude: 34.07868,
    longitude: -118.36145,
    zoom: 15,
  });
  const [popup, setPopup] = useState(true);
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
          zoom: 15,
          transitionDuration: 2000,
          transitionInterpolator: new FlyToInterpolator(),
        };
      });
      console.log("Active Post", props.activePost);
    }
  }, [props.activePost]);

  return (
    <MapGL
      {...viewport}
      width="auto"
      height="50vh"
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      onViewportChange={(nextViewport) => {
        console.log("Next Viewport", nextViewport);
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
            <div className="mapMarkerStyle" />
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
          offsetLeft={50}
          offsetTop={18}
          tipSize={5}
        >
          <div
            id={props.activePost.name}
            style={{ width: "auto", height: "auto" }}
            onClick={handleClick}
          >
            {props.activePost.name}
          </div>
        </Popup>
      )}
    </MapGL>
  );
};

function App(props) {
  const [activePost, setActivePost] = useState(null);
  const onMouseEnter = (e) => {
    console.log("Target ", e.currentTarget.id);
    setActivePost(toothpix.filter((el) => el.name === e.currentTarget.id)[0]);
  };
  const handleMarkerClick = (e) => {
    setActivePost(toothpix.filter((el) => el.name === e.currentTarget.id)[0]);
  };
  return (
    <div className="container">
      <div className="top">
        <Header></Header>
        <List posts={toothpix} onMouseEnter={onMouseEnter} />
      </div>
      <div className="bottom">
        <Map
          activePost={activePost}
          posts={toothpix}
          handleMarkerClick={handleMarkerClick}
        ></Map>
      </div>
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}

export default App;
