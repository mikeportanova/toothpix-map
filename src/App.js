import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map/Map";

import Sidebar from "./components/Sidebar/Sidebar";
import SidebarVideo from "./components/SidebarVideo/SidebarVideo";
import inspectedBy from "./inspectedBy.svg";
import Information from "./components/Information/Information";
import { toothpix } from "./toothpix";

function App() {
  const goldReviewed = toothpix.filter((item) => {
    return item.quote;
  });
  const [activePost, setActivePost] = useState(
    goldReviewed[Math.floor(Math.random() * goldReviewed.length)]
  );
  const [hoveredPost, setHoveredPost] = useState({ name: "fart" });

  const onMouseEnter = (e) => {
    console.log("Target ", e.currentTarget.id);
    setHoveredPost(
      toothpix.filter(
        (el) => `sidebar-${el.index.toString()}` === e.currentTarget.id
      )[0]
    );
  };

  const onMouseOut = (e) => {
    setHoveredPost({ name: "dummy" });
    document.getElementById(e.currentTarget.id).style.backgroundColor = "";
    console.log("mouse out");
  };

  const handleMarkerClick = (e) => {
    if (e.currentTarget.id.startsWith("marker")) {
      setActivePost(
        toothpix.filter(
          (el) => `marker-${el.index.toString()}` === e.currentTarget.id
        )[0]
      );
    } else {
      setActivePost(
        toothpix.filter(
          (el) => `sidebar-${el.index.toString()}` === e.currentTarget.id
        )[0]
      );
    }
  };

  const handleMarkerHover = (e) => {
    console.log("hover pin", e.currentTarget);
    setHoveredPost(
      toothpix.filter(
        (el) => `marker-${el.index.toString()}` === e.currentTarget.id
      )[0]
    );
    document.getElementById(e.currentTarget.id).style.backgroundColor =
      "#e803fc";
  };

  useEffect(() => {
    document
      .getElementById(`sidebar-${activePost.index.toString()}`)
      .scrollIntoView({ behavior: "smooth", block: "end" });
    if (document.getElementById(`marker-${activePost.index}`)) {
      document
        .getElementById(`marker-${activePost.index}`)
        .classList.add("mapMarkerStyleHovered");
    }
  }, [activePost]);

  return (
    <div className="page">
      <div className="left-container">
        <div className="inspectedByContainer">
          <img src={inspectedBy} alt="" />
          <SidebarVideo activePost={activePost} />
          <div className="mobile-attribution">
            <a
              href="https://www.mapbox.com/about/maps/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Maps &copy; Mapbox &copy; OpenStreetMap
            </a>
          </div>
        </div>
        <div className="sidebar-container">
          <Sidebar
            posts={toothpix}
            activePost={activePost}
            onMouseEnter={onMouseEnter}
            onMouseOut={onMouseOut}
            onClick={handleMarkerClick}
          />
        </div>
      </div>
      <div className="right-container">
        <div className="mobile-inspectedByContainer">
          <img src={inspectedBy} alt="" />
        </div>
        <div className="map-container">
          <Map
            activePost={activePost}
            hoveredPost={hoveredPost}
            posts={toothpix}
            handleMarkerClick={handleMarkerClick}
            handleMarkerHover={handleMarkerHover}
            onMouseOut={onMouseOut}
          ></Map>
        </div>

        <Information post={activePost} />
        <div className="black-footer"></div>

        <div className="attribution">
          <a
            href="https://www.mapbox.com/about/maps/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maps &copy; Mapbox &copy; OpenStreetMap
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
