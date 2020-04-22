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
    doordashURL:
      "https://www.doordash.com/business/3113/?utm_source=partner-link&utm_medium=website&utm_campaign=3113&utm_content=white-s",
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
    doordashURL: "",
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
    doordashURL: "",
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
    doordashURL: "",
    post: (
      <Post url="https://www.instagram.com/p/BUhJXvXjA4f/?utm_source=mp-toothpix" />
    ),
  },
];

const TOKEN =
  "pk.eyJ1IjoibWlrZXBvcnRhbm92YSIsImEiOiJjazM5YW9mYnIwMTk2M3JwOHF2YXZrMXluIn0.j0plcmSg3-gJkI8duiGbAg";

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
      height="532px"
      mapStyle="mapbox://styles/mikeportanova/ck9avra4p0xr11io1w82rxi2n"
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
            >
              <svg
                // begin SVG code for toothpix marker icon I copied from Sketch
                width="auto"
                height="auto"
                viewBox="0 0 112 135"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Page-1" stroke="none" stroke-width="1" fill="#e803fc">
                  <g id="Icon" fill="#e803fc">
                    <path
                      d="M106.7383,101.4219 C106.7113,102.8529 106.6703,105.0149 104.6793,106.7909 C103.8473,107.5329 101.6873,108.8899 98.2583,110.8219 C91.1823,114.8139 83.3173,115.9039 72.3683,116.3729 L103.4933,95.0129 C104.9253,96.2939 106.8643,98.4899 106.7523,100.9129 C106.7453,101.0609 106.7423,101.2319 106.7383,101.4219 Z M103.6433,117.3349 C103.6383,117.3599 103.0603,119.8079 101.4283,121.8069 C99.7483,123.8639 94.0663,127.5989 74.8853,129.4959 C63.6563,130.6069 53.2593,130.5159 53.1553,130.5129 C37.2663,130.3559 10.6413,127.7219 6.8353,121.3209 C5.8423,119.6509 5.3983,117.8239 5.3943,117.8109 C5.0663,116.4089 5.0613,115.2339 5.0883,114.6559 C5.1343,113.6359 5.3323,112.6169 5.6603,111.6349 C6.4183,112.2619 7.1343,112.7859 7.7043,113.2019 L7.7913,113.2649 C13.2193,117.2199 22.4783,121.2459 49.8763,121.2459 C50.0733,121.2459 50.2743,121.2449 50.4733,121.2449 L57.1423,125.2669 C57.4913,125.4769 57.8823,125.5809 58.2723,125.5809 C58.7063,125.5809 59.1383,125.4519 59.5103,125.1969 L65.6723,120.9689 C80.5613,120.5889 91.0943,119.8869 100.4073,114.6339 C101.5603,113.9839 102.5643,113.4019 103.4393,112.8799 C103.4963,113.0279 103.5543,113.1799 103.6203,113.3489 C104.1993,114.8339 103.8783,116.2789 103.6433,117.3349 Z M6.2043,98.3559 C6.8003,98.9579 7.4753,99.4009 8.2343,99.6819 C10.2863,100.4419 12.2013,99.7269 13.5503,98.9799 L43.0983,116.7979 C30.3273,116.4859 17.6393,115.0259 10.3683,109.7289 L10.2813,109.6649 C8.3113,108.2309 4.6463,105.5599 4.7623,102.2009 C4.8163,100.6259 5.4813,99.3219 6.2043,98.3559 Z M8.4783,62.1239 C13.2403,55.9639 24.3003,48.7559 49.8563,47.2389 L50.2483,66.9519 C50.2623,67.6649 50.4503,68.3639 50.7973,68.9879 C51.5483,70.3409 53.1753,71.7879 55.4933,71.7879 C56.5473,71.7879 58.1193,71.4699 59.6313,69.9589 C60.4033,69.1869 60.8583,68.1529 60.9083,67.0619 L61.8143,46.9639 C72.4323,47.1809 89.7313,49.5049 98.7363,61.3959 C103.2213,67.3189 103.7223,73.2969 102.7883,76.6159 C100.7553,83.8369 78.8623,89.0799 51.8603,88.8089 C26.8823,88.5589 6.7773,83.4919 5.0943,77.0229 C4.4783,74.6549 3.5753,68.4639 8.4783,62.1239 Z M57.7263,40.4759 L56.5363,66.8649 C56.1263,67.2749 55.7773,67.4119 55.4933,67.4119 C54.9263,67.4119 54.6233,66.8649 54.6233,66.8649 L54.0753,39.3809 L57.7263,40.4759 Z M43.6853,31.9159 L43.6853,11.8249 L62.2453,7.6559 L62.2453,36.4059 L43.6853,31.9159 Z M13.5913,93.7239 C13.1613,94.0259 12.7423,94.3209 12.3323,94.5919 C11.0113,95.4629 10.2393,95.7569 9.7533,95.5779 C9.5823,95.5149 9.1653,95.2769 8.7153,94.4369 C8.6523,94.1289 8.5283,93.8309 8.3283,93.5639 C7.7813,92.0909 7.2723,89.5499 7.1713,85.1809 C10.1033,86.8799 14.0003,88.3449 18.8673,89.5619 C19.6723,89.7629 20.5093,89.9529 21.3593,90.1389 C18.2043,90.4819 15.6923,92.2439 13.5913,93.7239 Z M23.2763,94.5099 C25.0133,94.7529 25.7963,95.5979 27.2653,97.3329 C28.8393,99.1919 30.7963,101.5039 34.8713,102.9709 C37.9813,104.0889 40.2083,103.9329 42.5653,103.7679 C44.5053,103.6309 46.7043,103.4769 50.0503,103.9859 C52.9383,104.4259 54.5573,105.3289 55.9853,106.1259 C57.2953,106.8569 58.6383,107.6069 60.4163,107.6069 C60.9063,107.6069 61.4293,107.5499 61.9943,107.4189 C65.2373,106.6699 66.7283,104.4779 67.9253,102.7159 C68.9323,101.2359 69.7273,100.0679 71.4443,99.5379 C72.9953,99.0599 74.7893,100.0889 76.8653,101.2799 C78.6993,102.3329 80.7063,103.4799 82.9683,103.7909 L58.1963,120.7919 L17.5733,96.2959 C19.3383,95.1379 21.1893,94.2189 23.2763,94.5099 Z M98.3563,93.2319 L90.0973,98.8999 C90.2093,98.4169 90.2943,97.9479 90.3693,97.5249 C90.7503,95.3789 91.0423,94.3149 92.0673,93.8289 C94.1143,92.8589 96.2963,92.8819 98.3563,93.2319 Z M103.5393,89.9889 C103.3843,89.9469 103.2313,89.9049 103.0883,89.8649 C99.8493,88.9709 94.9563,87.6179 90.1943,89.8749 C87.0153,91.3799 86.4643,94.4879 86.0603,96.7589 C85.7033,98.7709 85.5023,99.2889 85.0353,99.3969 C83.1393,99.8359 81.1503,98.6929 79.0423,97.4839 C76.4563,96.0009 73.5243,94.3189 70.1563,95.3569 C66.9713,96.3379 65.4943,98.5099 64.3073,100.2559 C63.1743,101.9229 62.5123,102.8089 61.0093,103.1549 C60.0873,103.3689 59.5803,103.1209 58.1173,102.3049 C56.5403,101.4249 54.3793,100.2189 50.7093,99.6599 C46.8833,99.0779 44.3193,99.2579 42.2593,99.4019 C40.0523,99.5579 38.5953,99.6599 36.3533,98.8539 C33.3803,97.7829 32.0323,96.1919 30.6053,94.5059 C29.6203,93.3429 28.5483,92.0819 26.9803,91.2019 C34.3693,92.4019 42.9103,93.0949 51.8163,93.1839 C52.4833,93.1909 53.1473,93.1929 53.8113,93.1929 C66.2183,93.1929 78.0013,92.0319 87.1773,89.8949 C92.2273,88.7179 96.3373,87.2869 99.4993,85.6119 C101.6123,87.6499 102.8353,89.0539 103.5393,89.9889 Z M66.6213,7.3409 L78.5733,8.5419 L78.5733,8.9189 C75.2413,11.1919 72.2173,13.2539 71.4453,13.7769 C71.4073,13.8029 71.3703,13.8299 71.3343,13.8579 C67.2323,17.0369 66.7133,21.7339 67.5953,25.0709 C68.3713,28.0059 70.1983,30.0229 72.3633,30.3329 L78.5733,31.2239 L78.5733,34.1639 L66.6213,36.5249 L66.6213,7.3409 Z M81.9823,11.8899 C81.9833,11.8889 81.9853,11.8879 81.9873,11.8869 C82.4653,11.5609 82.9443,11.2339 83.4213,10.9079 C82.9643,12.7539 82.7123,14.7659 82.7123,16.8859 C82.7123,21.1009 83.6993,24.8949 85.3433,27.7759 L73.0173,26.0089 C72.7353,25.9059 71.9503,24.9779 71.6873,23.2919 C71.5133,22.1799 71.3913,19.3869 73.9633,17.3569 C74.9073,16.7149 78.3723,14.3529 81.9823,11.8899 Z M89.8443,7.0819 C92.1533,9.2529 97.3723,15.9339 90.5923,27.5709 C88.5503,25.5089 87.0883,21.3929 87.0883,16.8859 C87.0883,12.9509 88.2033,9.3149 89.8443,7.0819 Z M99.8293,16.8859 C99.8293,22.2779 97.7373,27.1119 95.0623,28.5359 C99.4043,20.3619 98.6173,14.1199 97.0403,10.1729 C96.1093,7.8449 94.8163,6.0659 93.7013,4.8239 C96.9923,5.0849 99.8293,10.6079 99.8293,16.8859 Z M108.2063,93.5839 C108.2793,93.4859 108.3503,93.3869 108.4173,93.2759 C109.7563,91.0139 108.3423,88.1759 103.2463,83.1549 C105.1913,81.5419 106.4493,79.7559 107.0003,77.8009 C108.2643,73.3109 107.6743,65.9489 102.2243,58.7539 C92.1553,45.4579 73.4733,42.8429 62.0103,42.5919 L62.0893,40.8699 L63.9193,41.3129 C63.9283,41.3149 63.9393,41.3139 63.9493,41.3169 C64.1053,41.3519 64.2663,41.3739 64.4333,41.3739 C64.5753,41.3739 64.7173,41.3599 64.8573,41.3329 L64.8713,41.3299 L64.8773,41.3289 L81.1853,38.1079 C82.2103,37.9059 82.9493,37.0059 82.9493,35.9619 L82.9493,31.8519 L91.5633,33.0879 C92.1763,33.2479 92.8073,33.3369 93.4563,33.3369 L93.4613,33.3369 C93.4633,33.3369 93.4653,33.3369 93.4673,33.3369 C99.4893,33.3289 104.2043,26.1059 104.2043,16.8859 C104.2043,7.6619 99.4843,0.4359 93.4583,0.4359 C91.9143,0.4359 90.4573,0.9129 89.1413,1.7739 L89.1103,1.7289 C89.1103,1.7289 86.2743,3.6649 82.8643,5.9909 C82.6323,5.1359 81.9003,4.4779 80.9803,4.3859 L64.6523,2.7449 C64.6063,2.7399 64.5613,2.7439 64.5153,2.7419 C64.4883,2.7409 64.4623,2.7339 64.4333,2.7339 C64.4143,2.7339 64.3963,2.7389 64.3773,2.7399 C64.2753,2.7419 64.1743,2.7539 64.0733,2.7699 C64.0403,2.7759 64.0063,2.7769 63.9733,2.7839 C63.9673,2.7859 63.9603,2.7859 63.9533,2.7869 L41.0173,7.9399 C40.0183,8.1639 39.3093,9.0509 39.3093,10.0739 L39.3093,33.6369 C39.3093,34.6469 40.0003,35.5259 40.9823,35.7639 L49.9473,37.9329 C49.7773,38.4199 49.6903,38.9389 49.7013,39.4679 L49.7683,42.8689 C22.4343,44.4919 10.3433,52.5569 5.0163,59.4469 C-1.0717,67.3209 0.0813,75.1309 0.8603,78.1239 C1.1893,79.3889 1.8403,80.5829 2.7973,81.7049 C2.7973,81.7109 2.7953,81.7159 2.7953,81.7229 C2.6823,87.1619 3.0663,91.3069 3.9773,94.2699 C2.5033,95.7549 0.5133,98.4149 0.3893,102.0519 C0.3063,104.4459 1.1653,106.4839 2.3633,108.1779 C1.3833,110.1429 0.8163,112.2939 0.7173,114.4549 C0.6723,115.4369 0.7073,116.9879 1.1343,118.8099 C1.1583,118.9099 1.7253,121.2899 3.0743,123.5579 C5.9073,128.3209 15.0363,131.5519 30.9823,133.4339 C42.2813,134.7679 53.0043,134.8879 53.1113,134.8889 C53.4183,134.8919 53.8933,134.8949 54.5143,134.8949 C62.7803,134.8949 96.8803,134.2959 104.8173,124.5739 C107.1263,121.7469 107.8843,118.4249 107.9153,118.2839 C108.2113,116.9559 108.7593,114.4839 107.6973,111.7589 C107.4713,111.1829 107.3083,110.7439 107.1823,110.4009 C107.3333,110.2799 107.4713,110.1649 107.5933,110.0559 C111.0093,107.0079 111.0823,103.1509 111.1133,101.5039 C111.1163,101.3579 111.1183,101.2249 111.1233,101.1119 C111.2623,98.0859 109.8463,95.5179 108.2063,93.5839 Z"
                      id="Fill-4"
                    ></path>
                  </g>
                </g>
              </svg>
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
      <div className="top-container">
        <div className="top">
          <div className="inspectedByContainer">
            <img src={inspectedBy} alt="" />
          </div>
          <Sidebar
            posts={toothpix}
            onMouseEnter={onMouseEnter}
            onMouseOut={onMouseOut}
            onClick={handleMarkerClick}
          />
        </div>
        <div className="video-container">
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
      <div className="bottom-container"></div>
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
