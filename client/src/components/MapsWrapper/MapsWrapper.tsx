import { FC, ReactElement, useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../Map/Map";
import Search from "../Search/Search";
import Marker from "../Map/Marker";
import InfoWindow from "../Map/InfoWindow";
import markerData from "../../data/dummyData";

import { Position } from "../../types/Position";

type LatLng = google.maps.LatLngLiteral;
type GoogleMap = google.maps.Map;

const apiKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "";
const markers: any | null = markerData;

const MapsWrapper = () => {
  const [map, setMap] = useState<GoogleMap>();

  const [userLocation, setUserLocation] = useState<Position>({ lat: 30, lng: -90 });
  const [searchPlace, setSearchPlace] = useState<Position>({ lat: 0, lng: 0 });

  const [mapCenter, setMapCenter] = useState<Position>({ lat: 30, lng: -90 });
  const [mapZoom, setMapZoom] = useState<number>(4);
  const [activeMarker, setActiveMarker] = useState<any>();

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
  }, []);

  return (
    <Wrapper apiKey={apiKey} render={render} libraries={['places']}>
      <Search 
        setMapCenter={setMapCenter}
        setMapZoom={setMapZoom}
        map={map!}
      />
      <Map
        map={map!}
        setMap={setMap}
        center={mapCenter} 
        zoom={4}
      >
        {markers
          ? markers.map((marker: any, index: number) => (
            <Marker
              key={index}
              map={map!}
              markerData={marker}
              position={{ lat: marker.lat, lng: marker.lng }}
              setActiveMarker={setActiveMarker}
            />
            ))
          : null
          }
        {activeMarker
          ? <InfoWindow 
            marker={activeMarker}
            />
          : <></>
        }
      </Map>
    </Wrapper>
  )
};

export default MapsWrapper;



