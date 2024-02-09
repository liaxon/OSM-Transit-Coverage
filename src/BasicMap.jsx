import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import bookImg from "./book.png";
import { useEffect } from "react";
import { MAX_DISTANCE_IN_METERS } from "./App";

const LocationHandler = ({ updatePosition }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      updatePosition([lat, lng]);
    },
  });
  return null;
};

const ReCenterHandler = ({ lat, lon, centerOnSubmit }) => {
  const map = useMap();
  useEffect(() => {
    if (centerOnSubmit) {
      map.setView([lat, lon]);
    }
  }, [lat, lon]);
  return null;
};

const BasicMap = ({
  center: [lat, lon],
  points,
  updatePosition,
  centerOnSubmit,
}) => {
  const myIcon = new Icon({
    iconUrl: bookImg,
    iconSize: [35, 35], // size of the icon
    iconAnchor: [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={15.2}
      scrollWheelZoom={false}
      zoomControl={false}
      doubleClickZoom={false}
      touchZoom={false}
      style={{ height: "800px", width: "800px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={[lat, lon]}
        radius={MAX_DISTANCE_IN_METERS}
        opacity={0.2}
        fillOpacity={0.05}
      />
      {points.map((point) => (
        <Marker position={[point.lat, point.lon]} icon={myIcon}>
          <Popup>{point.name}</Popup>
        </Marker>
      ))}
      <LocationHandler updatePosition={updatePosition} />
      <ReCenterHandler lat={lat} lon={lon} centerOnSubmit={centerOnSubmit} />
    </MapContainer>
  );
};

export default BasicMap;
