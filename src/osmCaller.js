import { getEarthDistanceInMeters } from "./math";

const getLibraries = async (lat, lon, maxDistanceInMeters) => {
  const overpassQuery = `
    [out:json];
    node(around:${maxDistanceInMeters}, ${lat}, ${lon})["amenity"="library"];
    out;
  `;

  // call the Overpass API

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
    overpassQuery
  )}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  if (responseJson.elements.length === 0) {
    console.log("No amenity found!");
    return [];
  }

  console.log(responseJson);

  const amenities = responseJson.elements
    .map((amenity) => ({
      ...amenity.tags,
      lat: amenity.lat,
      lon: amenity.lon,
      distance: Math.round(
        getEarthDistanceInMeters(lat, lon, amenity.lat, amenity.lon)
      ),
    }))
    .filter((amenity) => amenity.name);

  return amenities;
};

export { getLibraries };
