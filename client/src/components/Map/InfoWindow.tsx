import { useState, useRef, useEffect } from "react";
import { LatLng, GoogleMap, Circle } from "../../types/types";

interface InfoWindowProps {
  marker: any, 
  map?: GoogleMap
};

const InfoWindow = (props: InfoWindowProps) => {
  
  const { marker, map } = props;

  const [infoWindow, setInfoWindow] = useState<any>();

  useEffect(() => {
    setInfoWindow(new google.maps.InfoWindow({
      content: marker.public_id,
      position: { lat: marker.lat, lng: marker.lng },
      pixelOffset: new google.maps.Size(0, -35)
    }))
  }, []);

  useEffect(() => {
    if (infoWindow) {
      console.log(infoWindow)
      infoWindow.setContent(marker.public_id);
      infoWindow.open({
        // anchor: { lat: marker.lat, lng: marker.lng },
        map
      })
      infoWindow.setPosition({ lat: marker.lat, lng: marker.lng })
    }
  }, [infoWindow, marker]);

  return (
    <div 
      id={marker.public_id} // TODO: Change to ID from database once the data is actually fetched
    />
  );
};

export default InfoWindow;
