import React, { useState, useEffect } from "react";
import MapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import "./App.css";
import List from "./components/List/List";
// import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import Post from "./components/Post/Post";
import logo from "./piggy-bank-facing-right.svg";
import Sidebar from "./components/Sidebar/Sidebar";
import SidebarVideo from "./components/SidebarVideo/SidebarVideo";
import inspectedBy from "./inspectedBy.svg";

const toothpix = [
  {
    url: "https://www.instagram.com/p/BVH0cADD3GP/?utm_source=mp-toothpix",
    latitude: 34.07868,
    longitude: -118.36145,
    name: "Canter's Deli",
    address: "419 N Fairfax Ave",
    post: (
      <Post url="https://www.instagram.com/p/BVH0cADD3GP/?utm_source=mp-toothpix" />
    ),
  },
  {
    url: "https://www.instagram.com/p/BQf0nQwhaYN/?utm_source=mp-toothpix",
    latitude: 34.1073962,
    longitude: -118.2544237,
    name: "Salazar",
    address: "2490 Fletcher Dr",
    post: (
      <Post url="https://www.instagram.com/p/BQf0nQwhaYN/?utm_source=mp-toothpix" />
    ),
  },
  {
    url: "https://www.instagram.com/p/BK6E1f_hVUb/?utm_source=mp-toothpix",
    latitude: 34.0778254,
    longitude: -118.1324377,
    name: "Chengdu Taste",
    address: "828 W Valley Blvd",
    post: (
      <Post url="https://www.instagram.com/p/BK6E1f_hVUb/?utm_source=mp-toothpix" />
    ),
  },
  {
    url: "https://www.instagram.com/p/BUhJXvXjA4f/?utm_source=mp-toothpix",
    latitude: 34.0843865,
    longitude: -118.2915498,
    name: "Papa John's Pizza",
    address: "720 North Vermont Avenue",
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
    zoom: 10,
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
          zoom: 11,
          transitionDuration: 2000,
          transitionInterpolator: new FlyToInterpolator(),
        };
      });
      console.log("Active Post", props.activePost);
    }
  }, [props.activePost]);

  // useEffect(() => {
  //   if (!props.anyHovered) {
  //     setViewport((prevState) => {
  //       return {
  //         ...prevState,
  //         latitude: 34.07868,
  //         longitude: -118.36145,
  //         zoom: 10,
  //         transitionDuration: 5000,
  //         transitionInterpolator: new FlyToInterpolator(),
  //       };
  //     });
  //   }
  // }, [props.anyHovered]);

  return (
    <MapGL
      {...viewport}
      width="auto"
      height="90vh"
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
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
          <Marker
            id={item.name}
            latitude={item.latitude}
            longitude={item.longitude}
            key={i}
          >
            <div
              id={item.name}
              className={
                item.name === props.hoveredPost.name
                  ? "mapMarkerStyle mapMarkerStyleHovered"
                  : "mapMarkerStyle"
              }
              onClick={props.handleMarkerClick}
              onMouseOver={props.handleMarkerHover}
              onMouseOut={props.onMouseOut}
            />
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
  const [hoveredPost, setHoveredPost] = useState({ name: "fart" });
  const [anyHovered, setAnyHovered] = useState(false);

  const onMouseEnter = (e) => {
    console.log("Target ", e.currentTarget.id);
    setAnyHovered(true);
    setHoveredPost(toothpix.filter((el) => el.name === e.currentTarget.id)[0]);
  };

  const onMouseOut = (e) => {
    setHoveredPost({ name: "dummy" });
    document.getElementById(e.currentTarget.id).style.backgroundColor = "";
    console.log("mouse out");
  };

  const handleMarkerClick = (e) => {
    setActivePost(toothpix.filter((el) => el.name === e.currentTarget.id)[0]);
    console.log("marker target", e.currentTarget, "target", e.target);
  };

  const handleMarkerHover = (e) => {
    console.log("hover pin", e.currentTarget);
    setHoveredPost(toothpix.filter((el) => el.name === e.currentTarget.id)[0]);
    document.getElementById(e.currentTarget.id).style.backgroundColor =
      "#e803fc";
  };

  return (
    <div className="page">
      <div className="container">
        <div className="top">
          <div className="inspectedByContainer">
            <img src={inspectedBy} alt="" />
          </div>
          <Sidebar
            posts={toothpix}
            onMouseEnter={onMouseEnter}
            onClick={handleMarkerClick}
          />
          <SidebarVideo activePost={activePost} />
        </div>
        <div className="map-container">
          <Map
            activePost={activePost}
            hoveredPost={hoveredPost}
            anyHovered={anyHovered}
            posts={toothpix}
            handleMarkerClick={handleMarkerClick}
            handleMarkerHover={handleMarkerHover}
            onMouseOut={onMouseOut}
          ></Map>
        </div>
      </div>
      <div className="icon-attribution">
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
