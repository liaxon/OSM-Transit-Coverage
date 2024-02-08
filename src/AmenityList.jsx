// list of all amenities, probably libraries
import { getEarthDistanceInMeters } from "./math";

const getAmenityString = (amenity, lat, lon) => {
  const distanceInMeters = Math.round(getEarthDistanceInMeters(lat, lon, amenity.lat, amenity.lon));

  if (
    amenity["addr:housenumber"] &&
    amenity["addr:street"] &&
    amenity["addr:city"] &&
    amenity["addr:state"]
  ) {
    const address =
      amenity["addr:housenumber"] +
      " " +
      amenity["addr:street"] +
      ", " +
      amenity["addr:city"] +
      " " +
      amenity["addr:state"];

    return `${amenity.name} @ ${address}, ${distanceInMeters}m away`;
  } else {
    return `${amenity.name}, ${distanceInMeters}m away`;
  }
};

const AmenityList = ({ amenityList, lat, lon }) => {
  return amenityList.length > 0 ? (
    <ul>
      {amenityList.map((amenity) => (
        <ul key={amenity.name}>{getAmenityString(amenity, lat, lon)}</ul>
      ))}
    </ul>
  ) : (
    <div>There are no libraries near that location in OSM.</div>
  );
};

export default AmenityList;
