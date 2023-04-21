import { ReactElement, useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Splash from "../Splash/Splash";
import Nearby from "../Nearby/Nearby";
import Map from "../Map/Map";
import Search from "../Search/Search";
import Marker from "../Map/Marker";
import InfoWindow from "../Map/InfoWindow";
import markerData from "../../data/dummyData";

type LatLng = google.maps.LatLngLiteral;
type GoogleMap = google.maps.Map;

const apiKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "";
const markers: any | null = markerData;

const MapsWrapper = () => {
  const [map, setMap] = useState<GoogleMap>();

  const [locationPermissionStatus, setLocationPermissionStatus] = useState<string>("prompt");
  const [userLocation, setUserLocation] = useState<LatLng | undefined>();
  const [searchPlace, setSearchPlace] = useState<LatLng>({ lat: 0, lng: 0 });

  const [mapCenter, setMapCenter] = useState<LatLng>({ lat: 30, lng: -90 });
  const [mapZoom, setMapZoom] = useState<number>(4);
  const [activeMarker, setActiveMarker] = useState<any>();

  const render = (status: Status): ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <></>;
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const userLocation: LatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(userLocation)
        setUserLocation(userLocation);
      });
    };
  };

  const handlePermission = () => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
        setLocationPermissionStatus(permissionStatus.state);
        console.log(permissionStatus.state);
        permissionStatus.onchange = () => {
          setLocationPermissionStatus(permissionStatus.state);
          getUserLocation();
        };
      });
    };
  };

  useEffect(() => {
    handlePermission();
    getUserLocation();
  }, []);

  return (
    <Wrapper apiKey={apiKey} render={render} libraries={['places']}>
      {{ // Switch statment based on browser's location permission status
        "prompt": 
          <Splash />,
        "granted": 
          <Nearby 
            map={map!}
            setMap={setMap}
            userLocation={userLocation}
            markers={markers}
            activeMarker={setActiveMarker}
            setActiveMarker={setActiveMarker}
          />,
        "denied": <div>
                    <p>We can't find your location. Search by a location:</p>
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
                  </div>
      }[locationPermissionStatus]
      }
    </Wrapper>
  )
};

export default MapsWrapper;
