import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map/Map";

import Sidebar from "./components/Sidebar/Sidebar";
import SidebarVideo from "./components/SidebarVideo/SidebarVideo";
import inspectedBy from "./inspectedBy.svg";
import Information from "./components/Information/Information";
import { toothpix } from "./toothpix";

function App() {
  const [activePost, setActivePost] = useState(
    toothpix[Math.floor(Math.random() * 40)]
  );
  const [hoveredPost, setHoveredPost] = useState({ name: "fart" });

  const onMouseEnter = (e) => {
    console.log("Target ", e.currentTarget.id);
    setHoveredPost(
      toothpix.filter((el) => `sidebar-${el.index}` === e.currentTarget.id)[0]
    );
  };

  const onMouseOut = (e) => {
    setHoveredPost({ name: "dummy" });
    document.getElementById(e.currentTarget.id).style.backgroundColor = "";
    console.log("mouse out");
  };

  const handleMarkerClick = (e) => {
    setActivePost(
      toothpix.filter((el) => `sidebar-${el.index}` === e.currentTarget.id)[0]
    );
    console.log("marker target", e.currentTarget, "target", e.target);
  };

  const handleMarkerHover = (e) => {
    console.log("hover pin", e.currentTarget);
    setHoveredPost(
      toothpix.filter((el) => `marker-${el.index}` === e.currentTarget.id)[0]
    );
    document.getElementById(e.currentTarget.id).style.backgroundColor =
      "#e803fc";
  };

  useEffect(() => {
    console.log("FART", activePost.index.toString());
    if (document.getElementById(`sidebar-${activePost.index.toString()}`)) {
      document
        .getElementById(`sidebar-${activePost.index.toString()}`)
        .scrollIntoView();
    }
  }, [activePost]);

  return (
    <div className="page">
      <div className="sidebar-container">
        <div className="inspectedByContainer">
          <img src={inspectedBy} alt="" />
        </div>
        <Sidebar
          posts={toothpix}
          activePost={activePost}
          onMouseEnter={onMouseEnter}
          onMouseOut={onMouseOut}
          onClick={handleMarkerClick}
        />
      </div>
      <div className="right-container">
        <div className="top-container">
          <div className="map-container">
            <div className="overlay">
              <SidebarVideo activePost={activePost} />
            </div>
            <Map
              activePost={activePost}
              hoveredPost={hoveredPost}
              posts={toothpix}
              handleMarkerClick={handleMarkerClick}
              handleMarkerHover={handleMarkerHover}
              onMouseOut={onMouseOut}
            ></Map>
          </div>
        </div>

        <Information post={activePost} />

        <div className="icon-attribution">
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
          <a href="https://www.mapbox.com/about/maps/" target="_blank">
            Maps &copy; Mapbox &copy; OpenStreetMap
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
