import { getTransitStops } from "./osmCaller";
import { useEffect, useState } from "react";
import BasicMap from "./BasicMap";

const MAX_DISTANCE_IN_METERS = 10000;
// 240m corresponds to roughly a 3 minute walk
const DISTANCE_TO_TRANSIT_IN_METERES = 240;

const LOCATION_DATA = {
  "Atlanta, USA": [33.76033018604708, -84.39309796197271],
  "Boston, USA": [42.354221229902265, -71.06663278479047],
  "CDMX, Mexico": [19.431685456149054, -99.13501998120523],
  "Chicago, USA": [41.87805131374253, -87.62481597091251],
  "Heidelberg, Germany": [49.411153623392494, 8.702310768786688],
  "Montreal, Canada": [45.5322744954375, -73.63655101201454],
  "NYC, USA": [40.78144036380948, -73.9662973922563],
  "Paris, France": [48.85462156614519, 2.347117097829155],
  "Phoenix, USA": [33.45615870494664, -112.07017700857584],
  "Worcester, USA": [42.27094899129767, -71.79948480379439],
};
const LOCATIONS_LIST = Object.keys(LOCATION_DATA);

const App = () => {
  const [transitStopList, setTransitStopList] = useState([]);

  const [inputLocation, setInputLocation] = useState(LOCATIONS_LIST[0]); // location from the drop-down menu
  const [pos, setPos] = useState(LOCATION_DATA[inputLocation]);

  const updateTransitStops = async () => {
    const transitStops = await getTransitStops(pos, MAX_DISTANCE_IN_METERS);

    setTransitStopList(transitStops);
  };

  // async function. Returns the user's coordinates, or null if this information is not available.
  const getUserCoordinates = () => {
    return new Promise((res, rej) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            res([coords.latitude, coords.longitude]);
          },
          () => res(null)
        );
      } else {
        res(null);
      }
    });
  };

  // Finds the user's coordinates, and updates the map coordinates to match.
  const setUserCoordinates = async () => {
    const userCoords = await getUserCoordinates();
    if (userCoords) {
      setPos(userCoords);
    }
  };

  useEffect(() => {
    updateTransitStops();
  }, [pos]);

  return (
    <div className="App">
      <div className="Header">
        <div className="Coordinate-Div">Lat: {pos[0].toFixed(7)}</div>
        <div className="Coordinate-Div">Lon: {pos[1].toFixed(7)}</div>
        <button className="Geolocate-Button" onClick={setUserCoordinates}>
          Zoom to Location
        </button>
        <div className="Location-Div">
          Go to...&nbsp;&nbsp;
          <select
            onChange={(e) => {
              setInputLocation(e.target.value);
              setPos(LOCATION_DATA[e.target.value]);
            }}
            className="Location-Selector"
          >
            {LOCATIONS_LIST.map((location) => (
              <option value={location} key={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr />
      <BasicMap
        pos={[pos[0], pos[1]]} // written like this to get rid of a TS error
        points={transitStopList}
        updateNewCenter={(pos) => {
          setPos(pos);
        }}
        transitStopRadius={DISTANCE_TO_TRANSIT_IN_METERES}
      />
      <hr />
    </div>
  );
};

export default App;
