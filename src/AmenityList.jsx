// list of all amenities, probably libraries
import { getEarthDistanceInMeters } from "./math";

const getAmenityString = (amenity) => {
  const distanceString =
    amenity.distance < 1000
      ? `${amenity.distance}m`
      : `${Math.round(amenity.distance / 1000)}km`;

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

    return `${amenity.name} @ ${address}, ${distanceString} away`;
  } else {
    return `${amenity.name}, ${distanceString} away`;
  }
};

const AmenityList = ({ amenityList }) => {
  // sort by distance
  amenityList = amenityList.sort((a, b) => a.distance - b.distance);

  return amenityList.length > 0 ? (
    <ul>
      {amenityList.map((amenity) => (
        <ul key={amenity.name}>{getAmenityString(amenity)}</ul>
      ))}
    </ul>
  ) : (
    <div>There are no libraries near that location in OSM.</div>
  );
};

export default AmenityList;
