import { FC, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import { Position } from "./types/Position";

const App: FC<{}> = () => {

  const [userLocation, setUserLocation] = useState<any>(null);

  useEffect(() => {
    const getUserLocation = () => {
      // if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          const userLocation: Position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLocation);
        });
    };
    getUserLocation();
  }, [])

  return (
    <div className="App">
      <Header />
      <Map userLocation={userLocation} />
    </div>
  );
};

export default App;
