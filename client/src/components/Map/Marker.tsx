import { useState, useRef, useEffect } from "react";

const Marker = ({ markerData, map, position }: {markerData: any, map?: google.maps.Map, position: google.maps.LatLngLiteral}) => {
  const [marker, setMarker] = useState<any>();

  useEffect(() => {
    setMarker(new google.maps.Marker({
      map: map, 
      position: position
    }))
  }, []);

  useEffect(() => {
    if (marker) {
      marker.setMap(map)
    }
  }, [marker]);

  return (
    <div 
      id={markerData.public_id} // TODO: Change to ID from database once the data is actually fetched
    />
  );
};

export default Marker;