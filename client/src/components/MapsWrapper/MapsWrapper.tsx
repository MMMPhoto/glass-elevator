import { ReactElement, useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Splash from "../Splash/Splash";
import Nearby from "../Nearby/Nearby";
import LocationSwitch from "../LocationSwitch/LocationSwitch";
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
  const [mapVisibility, setMapVisibility] = useState<React.CSSProperties>({visibility: "hidden"});

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

  const getUserLocation = (): Promise<any> => {
    return new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));
  };

  const handleUserLocation = async () => {
    try {
      const position = await getUserLocation();
      console.log(position);
      const userLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      setUserLocation(userLatLng);
      setMapCenter(userLatLng);
      setMapZoom(10);
      return position;
    } catch(err) {
      console.error(err);
    };
  };

  const handlePermission = () => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
        setLocationPermissionStatus(permissionStatus.state);
        console.log(`Location permission is ${permissionStatus.state}`);
        permissionStatus.onchange = () => {
          setLocationPermissionStatus(permissionStatus.state);
          handleUserLocation();
        };
      });
    };
  };

  useEffect(() => {
    handlePermission();
    handleUserLocation();
  }, []);

  return (
    <Wrapper apiKey={apiKey} render={render} libraries={['places']}>
      {{"prompt": <Splash />,
        "denied": <p>We can't get your location. You'll first need to <a href="https://docs.buddypunch.com/en/articles/919258-how-to-enable-location-services-for-chrome-safari-edge-and-android-ios-devices-gps-setting">change</a> your browser's settings and then try again.</p>,
        "approved": null
      }[locationPermissionStatus]}
      {locationPermissionStatus !== "prompt"
        ? <div>
            <LocationSwitch 
              handleUserLocation={handleUserLocation}
              userLocation={userLocation}
              setUserLocation={setUserLocation}
              setMapVisibility={setMapVisibility}
            />
            {userLocation
              ? <Nearby 
                  map={map!}
                  setMap={setMap}
                  userLocation={userLocation}
                  markers={markers}
                  activeMarker={setActiveMarker}
                  setActiveMarker={setActiveMarker}
                  setMapVisibility={setMapVisibility}
                />
              : <div>
                  <Search 
                    setMapCenter={setMapCenter}
                    setMapZoom={setMapZoom}
                    map={map!}
                    setMapVisibility={setMapVisibility}
                  />
                </div>
            }
            <div style={mapVisibility}>
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
          </div>
        : null
      }
    </Wrapper>
  )
};

export default MapsWrapper;
