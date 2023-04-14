import { useState, useRef, useEffect, Children, isValidElement, cloneElement, Dispatch, SetStateAction } from "react";

const Marker = ({ children, markerData, map, position, setActiveMarker }: {
    children: JSX.Element, 
    markerData: any, 
    map?: google.maps.Map, 
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
        setActiveMarker(markerData.public_id);
      })
    }
  }, [marker]);

  return (
    <div 
      id={markerData.public_id} // TODO: Change to ID from database once the data is actually fetched
    >
      { map
        ? Children.map(children, (child) => {
          if (isValidElement<{markerData: any, map: google.maps.Map}>(child)) {
            return cloneElement(child, { markerData: markerData, map: map } )};
          })
        : null
      }
    </div>
  );
};

export default Marker;
