import mapboxgl from "mapbox-gl";
import { useState, useEffect, useRef } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoibGFyZ2V3YXRlciIsImEiOiJjbDZoOTAwZWkweWNjM2JvYThnbm03YjMzIn0.r11MoNzvczr0RUCDmi9brQ";
// const map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/mapbox/streets-v11',
//   zoom: 2,
//   center: [1, 1],
//   projection: 'globe'
// });
// var directions = new MapboxDirections({
//   accessToken: mapboxgl.accessToken,
//   unit: 'imperial',
//   profile: 'mapbox/driving',
//   interactive: false,
// });
// map.addControl(directions, 'top-left');
// const nav = new mapboxgl.NavigationControl();
// map.addControl(nav, 'top-right');
// map.addControl(
//   new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl
//   })
// );
// map.on('load', () => {
//   map.setFog({
//     "range": [-20, -5],
//     "color": "#c7d5d9",
//     "horizon-blend": 0.02,
//     "star-intensity": 1
//   });
// });

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      projection: "globe",
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on(
      "load",
      () => {
        map.setFog({
          range: [-20, -5],
          color: "#c7d5d9",
          "horizon-blend": 0.02,
          "star-intensity": 1,
        });

        // const directions = new map.MapboxDirections({
        //   accessToken: mapboxgl.accessToken,
        //   unit: "imperial",
        //   profile: "mapbox/driving",
        //   interactive: false,
        // });
        // map.addControl(directions, "top-left");
        // const nav = new mapboxgl.NavigationControl();
        // map.addControl(nav, "top-right");
        // map.addControl(
        //   new map.MapboxGeocoder({
        //     accessToken: mapboxgl.accessToken,
        //     mapboxgl: mapboxgl,
        //   })
        // );
        map.on("move", () => {
          setLng(map.getCenter().lng.toFixed(4));
          setLat(map.getCenter().lat.toFixed(4));
          setZoom(map.getZoom().toFixed(2));
        });

        // Clean up on unmount
        return () => map.remove();
      },
      []
    );

    return (
      <div>
        <div className="sidebarStyle">
          <div>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>
        <div className="map-container" ref={mapContainerRef} />
      </div>
    );
  });
};

export default Map;
