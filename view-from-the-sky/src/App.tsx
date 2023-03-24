import { FC, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Map from "./components/Map/Map";
import { Position } from "./types/Position";

const App: FC<{}> = () => {

  // Browser Location State Variables
  const [userLocation, setUserLocation] = useState<any>(null);
  const [locationAccess, setLocationAccess] = useState<boolean>(false);

  const getUserLocation = () => {
    // if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const userLocation: Position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(userLocation);
        setLocationAccess(true);
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
          <Route path="/" element={<Search />} />
          <Route path="/map" element={<Map userLocation={userLocation} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
