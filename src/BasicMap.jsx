import "leaflet/dist/leaflet.css";
import {
  Circle,
  MapContainer,
  Pane,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useEffect } from "react";

// listens for user clicks. If a user clicks at a location, set that location (but don't recenter the map)
const ClickHandler = ({ updatePosition }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      updatePosition([lat, lng]);
    },
  });
  return null;
};

// listens for a change in "pos". If "pos" changes, then re-center the map to that location.
const ReCenterHandler = ({ pos }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(pos);
  }, [pos]);
  return null;
};

const BasicMap = ({ pos, points, transitStopRadius, updateNewCenter }) => {
  return (
    <MapContainer
      center={pos}
      zoom={15}
      doubleClickZoom={false}
      zoomAnimation={true}
      style={{ height: "800px", width: "800px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Pane name="transitstop-area" style={{ opacity: 0.3 }}>
        {points.map((point) => (
          <Circle
            key={point.pos}
            center={point.pos}
            radius={transitStopRadius}
            fillOpacity={1}
          />
        ))}
      </Pane>
      <ClickHandler updatePosition={updateNewCenter} />
      <ReCenterHandler pos={pos} />
    </MapContainer>
  );
};

export default BasicMap;
