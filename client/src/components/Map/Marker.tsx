import { useState, useRef, useEffect, Children, isValidElement, cloneElement, Dispatch, SetStateAction } from "react";

const Marker = ({ map, markerData, position, setActiveMarker }: {
    map: google.maps.Map, 
    markerData: any, 
    position: google.maps.LatLngLiteral,
    setActiveMarker: Dispatch<SetStateAction<string>>
  }) => {
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
      marker.addListener("click", () => {
        setActiveMarker(markerData)
      })
    }
  }, [marker]);

  return (
    <div 
      id={markerData.public_id} // TODO: Change to ID from database once the data is actually fetched
    />
  );
};

export default Marker;
