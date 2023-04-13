import { FC, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Map from "./components/Map/Map";
import { Position } from "./types/Position";

const App: FC<{}> = () => {

  // Browser Location State Variables
  const [userLocation, setUserLocation] = useState<Position>({ lat: 0, lng: 0 });
  const [searchPlace, setSearchPlace] = useState<Position>({ lat: 0, lng: 0 });

  const getUserLocation = () => {
    // if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const userLocation: Position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(userLocation);
      });
    // } else {

    // };
  };

  // navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
  //   permissionStatus.onchange = () => {
  //     setLocationAccess(permissionStatus.state == "granted");
  //     if (permissionStatus.state=="granted") {
  //       getUserLocation();
  //     }
  //   };
  // });

  useEffect(() => {
    getUserLocation();
  }, [userLocation])

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Search setSearchPlace={setSearchPlace} />} />
          <Route path="/map" element={<Map userLocation={userLocation} searchPlace={searchPlace} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
