// This file contains the math behind getting distances between two points on the Earth.
// It is not currently used by the app.

const degToRad = (2 * Math.PI) / 360;
const RadToDeg = 360 / (2 * Math.PI);

const earthRadiusInMeters = 6.3781e6;

const getSpherePoint = ([lat, lon]) => {
  const x = Math.cos(lat * degToRad) * Math.cos(lon * degToRad);
  const y = Math.cos(lat * degToRad) * Math.sin(lon * degToRad);
  const z = Math.sin(lat * degToRad);
  return [x, y, z];
};

const getNorm = (p) => Math.hypot(...p);

const getDistance = (p1, p2) => {
  const diff = [p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]];
  return getNorm(diff);
};

const getSphereDistance = (pos1, pos2) => {
  const p1 = getSpherePoint(pos1);
  const p2 = getSpherePoint(pos2);
  const d = getDistance(p1, p2);

  // d is the distance between points as the mole burrows. We need to find the distance between two points as the crow flies.
  const arcLength = 2 * Math.asin(d / 2);
  return arcLength;
};

const getEarthDistanceInMeters = (pos1, pos2) => {
  return getSphereDistance(pos1, pos2) * earthRadiusInMeters;
};

export { getEarthDistanceInMeters };
