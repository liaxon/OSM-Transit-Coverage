import "./App.css";
import { getLibraries } from "./osmCaller";
import { useEffect, useState } from "react";
import LabeledInput from "./LabeledInput";
import AmenityList from "./AmenityList";
import BasicMap from "./BasicMap";

// utility function to clean a string coordinate and produces a number.
// more forgiving than the standard "Number(...)" function
const cleanCoordinate = (coordinateString) => {
  // i18n
  coordinateString = coordinateString.replace(/,/, ".");
  // Clean of all strange characters
  coordinateString = coordinateString.replace(/[^\d-.]/, "");
  // Only allow one decimal point
  coordinateString = coordinateString.split(/\./, 2).join(".");
  let coord = Number(coordinateString);
  if (Number.isFinite(coord)) {
    // blue moon case when we WANT the modulus operator to return a negative number on a negative input
    return coord % 180;
  }
  return 0;
};

const MAX_DISTANCE_IN_METERS = 1700;

const App = () => {
  const [latitudeInput, setLatitudeInput] = useState("40.7731318825");
  const [longitudeInput, setLongitudeInput] = useState("-73.97811412");
  const [lat, setLat] = useState(cleanCoordinate(latitudeInput));
  const [lon, setLon] = useState(cleanCoordinate(longitudeInput));
  const [outputList, setOutputList] = useState([]);

  const [alreadyRun, setAlreadyRun] = useState(false);
  const [centerOnSubmit, setCenterOnSubmit] = useState(false);
  const [forceSubmit, setForceSubmit] = useState(true);

  const onSubmit = async () => {
    const newLat = cleanCoordinate(latitudeInput);
    const newLon = cleanCoordinate(longitudeInput);

    // get the libraries
    const libraries = await getLibraries(
      newLat,
      newLon,
      MAX_DISTANCE_IN_METERS
    );

    setOutputList(libraries);
    setLat(newLat);
    setLon(newLon);
    setAlreadyRun(true);
  };

  useEffect(() => {
    if (forceSubmit) {
      onSubmit();
      setForceSubmit(false);
    }
  }, [forceSubmit]);

  const setUserCoordinates = () => {
    return new Promise((res, rej) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            setLatitudeInput(coords.latitude.toString());
            setLongitudeInput(coords.longitude.toString());
            setCenterOnSubmit(true);
            setForceSubmit(true); // we can't call "onSubmit" directly, so we wait for the next render.
            res([latitudeInput, longitudeInput]);
          },
          () => rej("Location data denied")
        );
      } else {
        rej("Location data not avilable.");
      }
    });
  };

  const pointsOfInterest = outputList.map((library) => ({
    lat: library.lat,
    lon: library.lon,
    name: library.name,
  }));

  return (
    <div className="App">
      <div>Input a location:</div>
      <div className="Input-Div">
        <LabeledInput
          label="LAT:"
          contents={latitudeInput}
          setContents={setLatitudeInput}
        />
        <div style={{ width: "40px" }}></div>
        <LabeledInput
          label="LONG:"
          contents={longitudeInput}
          setContents={setLongitudeInput}
        />
        <div style={{ width: "40px" }}></div>
        <button className="Main-Button" onClick={setUserCoordinates}>
          Use Local
        </button>
      </div>
      <button className="Main-Button" onClick={onSubmit}>
        Click me
      </button>
      <hr />
      <BasicMap
        center={[lat, lon]}
        points={pointsOfInterest}
        updatePosition={([lat, lon]) => {
          setLatitudeInput(lat.toString());
          setLongitudeInput(lon.toString());
          setCenterOnSubmit(false); // we do this to jumping about when updating mid-drag
          setForceSubmit(true);
        }}
        centerOnSubmit={centerOnSubmit}
      />
      <hr />
      {alreadyRun ? (
        <AmenityList amenityList={outputList} />
      ) : (
        <div>Check for libraries</div>
      )}
    </div>
  );
};

export default App;
export { MAX_DISTANCE_IN_METERS };
