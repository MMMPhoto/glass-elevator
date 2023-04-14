import { useState, useRef, useEffect } from "react";

const InfoWindow = ({ marker, markerClicked, map}: {marker: any, markerClicked: boolean, map?: google.maps.Map}) => {
  const [infoWindow, setInfoWindow] = useState<any>();

  useEffect(() => {
    setInfoWindow(new google.maps.InfoWindow({
      content: marker.public_id,
      position: { lat: marker.lat, lng: marker.lng }
    }))
  }, []);

  useEffect(() => {
    if (infoWindow) {
      infoWindow.open({
        anchor: marker,
        map
      })
    }
  }, [infoWindow]);

  return (
    <div 
      id={marker.public_id} // TODO: Change to ID from database once the data is actually fetched
    />
  );
};

export default InfoWindow;
