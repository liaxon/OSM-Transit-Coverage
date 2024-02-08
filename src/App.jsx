import "./App.css";
import { getLibraries } from "./osmCaller";
import { useEffect, useState } from "react";
import LabeledInput from "./LabeledInput";
import AmenityList from "./AmenityList";

const App = () => {
  const [latitude, setLatitude] = useState("42.3314140");
  const [longitude, setLongitude] = useState("-71.20218899681677  ");
  const [processedLatitude, setProcessedLatitude] = useState(latitude);
  const [processedLongitude, setProcessedLongitude] = useState(longitude);
  const [outputList, setOutputList] = useState([]);

  const [alreadyRun, setAlreadyRun] = useState(false);
  const [forceSubmit, setForceSubmit] = useState(false);

  const onSubmit = async () => {
    // get the libraries
    const libraries = await getLibraries(latitude, longitude);

    setOutputList(libraries);
    setProcessedLatitude(latitude);
    setProcessedLongitude(longitude);
    setAlreadyRun(true);
  };

  useEffect(() => {
    if (forceSubmit) {
      setForceSubmit(false);
      onSubmit();
    }
  }, [forceSubmit]);

  const setUserCoordinates = () => {
    return new Promise((res, rej) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            setLatitude(coords.latitude.toString());
            setLongitude(coords.longitude.toString());
            setForceSubmit(true); // we can't call "onSubmit" directly, so we wait for the next render.
            res([latitude, longitude]);
          },
          () => rej("Location data denied")
        );
      } else {
        rej("Location data not avilable.");
      }
    });
  };

  return (
    <div className="App">
      <div>Input a location:</div>
      <div className="Input-Div">
        <LabeledInput
          label="LAT:"
          contents={latitude}
          setContents={setLatitude}
        />
        <div style={{ width: "40px" }}></div>
        <LabeledInput
          label="LONG:"
          contents={longitude}
          setContents={setLongitude}
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
      {alreadyRun ? (
        <AmenityList
          amenityList={outputList}
          lat={Number(processedLatitude)}
          lon={Number(processedLongitude)}
        />
      ) : (
        <div>Check for libraries</div>
      )}
    </div>
  );
};

export default App;
