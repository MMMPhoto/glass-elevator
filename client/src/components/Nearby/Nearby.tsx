import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import Map from "../Map/Map";
import Search from "../Search/Search";
import Marker from "../Map/Marker";
import InfoWindow from "../Map/InfoWindow";

type LatLng = google.maps.LatLngLiteral;
type GoogleMap = google.maps.Map;

const Nearby = ({map, setMap, userLocation, markers, setActiveMarker} : {
  map: GoogleMap,
  setMap: Dispatch<SetStateAction<GoogleMap | undefined >>,
  userLocation: LatLng,
  markers: any,
  setActiveMarker: Dispatch<SetStateAction<string>>
}) => {
   
  const [closestMatch, setClosestMatch] = useState<any>(null);
  const [checkedMatches, setCheckedMatches] = useState<boolean>(false);
  
  useEffect(() => {
    if (userLocation && markers) {
      const closestLat: number = 0.001;
      const closestLng: number = 0.001;
      markers.forEach((marker: any) => {
        const difference = (a: number, b: number) => Math.abs(a - b);
        const latDiff = difference(marker.lat, userLocation.lat);
        const lngDiff = difference(marker.lng, userLocation.lng);
        if (latDiff < closestLat && lngDiff < closestLng) {
          setClosestMatch(marker);
        };
      });
    };
  }, [userLocation, markers]);

  return(
    <div>
        { closestMatch && checkedMatches
          ? <div>
              <img src={`https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_2000/v1665696442/${closestMatch.public_id}.jpg`}/>
            </div>
          : <div>
              <p>Your location: {userLocation.lat} {userLocation.lng}</p>
              <p>You don't appear to be at one of our Views. Here are the views nearest to you:</p>
              <Map
                map={map}
                setMap={setMap}
                center={userLocation} 
                zoom={8}
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
                      {/* {activeMarker
                        ? <InfoWindow 
                          marker={activeMarker}
                          />
                        : <></>
                      } */}
                    </Map>
            </div> 
        }
    </div>
  )
};

export default Nearby;
