import { FC, ReactElement, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Map from "./components/Map/Map";
import MapsWrapper from "./components/MapsWrapper/Wrapper";
import SearchTest from "./components/Search/SearchTest";
import MapTest from "./components/Map/MapTest";
import Marker from "./components/Map/Marker";
import markerData from "./data/dummyData";

import { Position } from "./types/Position";

const apiKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "";
const markers: any | null = markerData;

const App = () => {

  // Browser Location State Variables
  const [userLocation, setUserLocation] = useState<Position>({ lat: 30, lng: -90 });
  const [searchPlace, setSearchPlace] = useState<Position>({ lat: 0, lng: 0 });

  console.log(userLocation);
  const render = (status: Status): ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <></>;
  };

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
  }, [])

  return (
    // <Router>
      <div className="App">
        <Header />
        <Wrapper apiKey={apiKey} render={render} libraries={['places']}>
          <SearchTest />
          <MapTest
            center={userLocation} 
            zoom={4}
          >
            {markers
              ? markers.map((marker: any, index: number) => (
                <Marker
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  markerData={marker}
                />
                ))
              : null
              }
          </MapTest>
        </Wrapper>
        {/* <Routes>
          <Route path="/" element={<Search setSearchPlace={setSearchPlace} />} />
          <Route path="/map" element={<Map userLocation={userLocation} searchPlace={searchPlace} />} />
        </Routes> */}
      </div>
    // {/* </Router> */}
  );
};

export default App;
