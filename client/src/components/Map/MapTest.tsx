import { useState, useRef, useEffect, Children, isValidElement, cloneElement, Fragment} from "react";
import { JsxElement, isNoSubstitutionTemplateLiteral } from "typescript";

type LatLng = google.maps.LatLngLiteral;
type GoogleMap = google.maps.Map;
type MapTypeId = google.maps.MapTypeId;

interface MapInterface {
  // mapType: MapTypeId,
  // mapTypeControl?: boolean | undefined,
  children: JSX.Element,
  center: LatLng,
  zoom: number
};

const MapTest = ({ 
    children, 
    center, zoom }: {
      children?: JSX.Element | JSX.Element[]
      center: LatLng, zoom: number}) => {
  const ref = useRef(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    setMap(new google.maps.Map(ref.current!, { 
      center: center, 
      zoom: zoom })) 
  }, []);

  return (
    <div 
      ref={ref} 
      style={{ height: "100vh" }} 
      id="map"
    >
      { map
        ? Children.map(children, (child) => {
          if (isValidElement<{map: typeof map}>(child)) {
            return cloneElement(child, { map: map } )};
          })
        : null
      }

    </div>
  );
};

export default MapTest;
