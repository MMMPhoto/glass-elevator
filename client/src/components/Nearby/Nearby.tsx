import { ReactElement, useEffect, useState } from "react";

type LatLng = google.maps.LatLngLiteral;
type GoogleMap = google.maps.Map;

const Nearby = ({ userLocation, markers} : {
  // map: GoogleMap,
  userLocation: LatLng,
  markers: any,
}) => {

  const [viewNearby, setViewNearby] = useState<boolean>(false);

  useEffect(() => {
    if (userLocation && markers) {
      console.log(userLocation);
      console.log(markers);
      let closestMatch: any = null;
      const closestLat: number = 0.001;
      const closestLng: number = 0.001;
      markers.forEach((marker: any) => {
        const difference = (a: number, b: number) => Math.abs(a - b);
        const latDiff = difference(marker.lat, userLocation.lat);
        const lngDiff = difference(marker.lng, userLocation.lng);
        if (latDiff < closestLat && lngDiff < closestLng) {
          closestMatch = marker;
          console.log("match!");
        } else {
          console.log("nothing :(");
        }
      });
      console.log(closestMatch);
    };
  }, [userLocation, markers]);

  return(
    <div>hello</div>
  )
};

export default Nearby;
