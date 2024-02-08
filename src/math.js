// This file contains basic utility functions or constants, usually for working with latitude and longitude.

const degToRad = (2 * Math.PI) / 360;
const RadToDeg = 360 / (2 * Math.PI);

const earthRadiusInMeters = 6.3781e6;

const getSpherePoint = (lat, lon) => {
  const x = Math.cos(lat * degToRad) * Math.cos(lon * degToRad);
  const y = Math.cos(lat * degToRad) * Math.sin(lon * degToRad);
  const z = Math.sin(lat * degToRad);
  return [x, y, z];
};

const getNorm = (p) => Math.hypot(...p);

const getDistance = ([x1, y1, z1], [x2, y2, z2]) => {
  return getNorm([x1 - x2, y1 - y2, z1 - z2]);
};

const getSphereDistance = (lat1, lon1, lat2, lon2) => {
  const p1 = getSpherePoint(lat1, lon1);
  const p2 = getSpherePoint(lat2, lon2);
  const d = getDistance(p1, p2);

  // d is the distance between points as the mole digs. We need to find the distance between two points as the crow flies.
  const arcLength = 2 * Math.asin(d / 2);
  return arcLength;
};

const getEarthDistanceInMeters = (lat1, lon1, lat2, lon2) => {
  return getSphereDistance(lat1, lon1, lat2, lon2) * earthRadiusInMeters;
};

export {getEarthDistanceInMeters}