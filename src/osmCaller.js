// This file handles API calls to Overpass.
// The best way to test API calls is with Overpass Turbo (https://overpass-turbo.eu/)

import { getEarthDistanceInMeters } from "./math";

const getTransitStops = async (pos, maxDistanceInMeters) => {
  const overpassQuery = `
    [out:json];
    (
      node(around:${maxDistanceInMeters}, ${pos[0]}, ${pos[1]})["highway"="bus_stop"];
      node(around:${maxDistanceInMeters}, ${pos[0]}, ${pos[1]})["public_transport"];
      node(around:${maxDistanceInMeters}, ${pos[0]}, ${pos[1]})["highway"="platform"];
    );
    out;
  `;

  // call the overpass API
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
    overpassQuery
  )}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  console.log(responseJson);

  // process results into a more usable form
  return responseJson.elements.map((node) => ({
    ...node.tags,
    pos: [node.lat, node.lon],
    distance: Math.round(getEarthDistanceInMeters(pos, [node.lat, node.lon])),
  }));
};

export { getTransitStops };
