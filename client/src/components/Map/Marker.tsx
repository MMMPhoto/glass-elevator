import { useState, useRef, useEffect } from "react";

const Marker = ({ options, map, position }: {options?: any, map?: google.maps.Map, position: google.maps.LatLngLiteral}) => {
  const [marker, setMarker] =useState<any>();
  const ref = useRef(null);
  position = position

  useEffect(() => {
    setMarker(new google.maps.Marker({
      map: map, 
      position: position }))
    console.log(marker)
  }, []);

  useEffect(() => {
    if (marker) {
      marker.setMap(map)
    }
  }, [marker]);

  return (
    <div 
      ref={ref}
      id="marker" 
    />
  );
};

export default Marker;
