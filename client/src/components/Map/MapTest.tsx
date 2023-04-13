import { FC, useState, useRef, useEffect } from "react";

function MapTest({center, zoom}: {center: google.maps.LatLngLiteral, zoom: number}) {
  const ref = useRef(null);
  const [map, setMap] = useState<google.maps.Map>();


  useEffect(() => {
    console.log(center);
    console.log(zoom);
    new window.google.maps.Map(ref.current!, { center, zoom })
  }, []);

  return (
    <div ref={ref} style={{ height: "100vh" }} id="map" />
    // <div><h3>Map!</h3></div>
  );
};

export default MapTest;
