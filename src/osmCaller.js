const getLibraries = async (latitude, longitude) => {
  const maxDistanceInMeters = 700;

  // clean up "latitude" and "longitude"
  // This only allows ".", digits, and "-", so it should not do anything crazy in overpass even if it is not a number
  latitude = latitude.replace(",", ".");
  latitude = latitude.replace("[^\\d-.]", "");
  longitude = longitude.replace(",", ".");
  longitude = longitude.replace("[^\\d-.]", "");

  const overpassQuery = `
    [out:json];
    node(around:${maxDistanceInMeters}, ${latitude}, ${longitude})["amenity"="library"];
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

  const amenities = responseJson.elements.map((amenity) => ({...amenity.tags, lat: amenity.lat, lon: amenity.lon}));

  return amenities;
};

export { getLibraries };
