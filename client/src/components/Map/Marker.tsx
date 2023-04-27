import { useState, useRef, useEffect, Children, isValidElement, cloneElement, Dispatch, SetStateAction } from "react";
import { LatLng, GoogleMap, Circle } from "../../types/types";

interface MarkerProps {
  map: GoogleMap, 
  markerData: any, 
  position: LatLng,
  setActiveMarker: Dispatch<SetStateAction<string>>
};


const Marker = (props: MarkerProps) => {

  const { map, markerData, position, setActiveMarker } = props;

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
