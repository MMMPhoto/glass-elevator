import { useState, useRef, useEffect } from "react";

const InfoWindow = ({ marker, map}: {marker: any, map?: google.maps.Map}) => {
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

  // useEffect(() => {
  //   if (marker) {
  //     infoWindow.setContent(marker.public_id);
  //     infoWindow.open({
  //       anchor: {lat: marker.lat, lng: marker.lng },
  //       map
  //     });
  //   };
  // }, [marker]);

  return (
    <div 
      id={marker.public_id} // TODO: Change to ID from database once the data is actually fetched
    />
  );
};

export default InfoWindow;
