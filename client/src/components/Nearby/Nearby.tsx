import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { LatLng, GoogleMap, Circle } from "../../types/types";

const Nearby = ({map, setMap, userLocation, markers, activeMarker, setActiveMarker, setMapVisibility} : {
  map: GoogleMap,
  setMap: Dispatch<SetStateAction<GoogleMap | undefined >>,
  userLocation: LatLng | undefined,
  markers: any,
  activeMarker: any,
  setActiveMarker: Dispatch<SetStateAction<string>>
  setMapVisibility: Dispatch<SetStateAction<React.CSSProperties>>
}) => {
   
  const [closestMatch, setClosestMatch] = useState<any>(null);
  
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
      setMapVisibility({visibility: "visible"});
    };
  }, [userLocation, markers]);

  return(
    <div>
        {!userLocation
          ? <p>Checking for nearby Views...</p>
          : closestMatch
            ? <div>
                <img src={`https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_2000/v1665696442/${closestMatch.public_id}.jpg`}/>
              </div>
            : <div>
                <p>Your location: {userLocation!.lat} {userLocation!.lng}</p>
                <p>Nearest views:</p>
              </div>
        }
    </div>
  )
};

export default Nearby;
