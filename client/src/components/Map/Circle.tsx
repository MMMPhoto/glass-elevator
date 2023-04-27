import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { LatLng, GoogleMap, Circle } from "../../types/types";
import { isEditable } from "@testing-library/user-event/dist/utils";

interface SearchCircleProps {
  map?: GoogleMap,
  mapCenter: LatLng,
  searchCircle: Circle | undefined,
  setSearchCircle: Dispatch<SetStateAction<Circle | undefined>>,
  searchRadius: number
};

const SearchCircle = (props: SearchCircleProps) => {
  
  const { map, mapCenter, searchCircle, setSearchCircle, searchRadius } = props;

  useEffect(() => {
    if (map) {
      searchCircle?.setMap(null);
      setSearchCircle(new google.maps.Circle({
        strokeOpacity: 0,
        fillOpacity: 0.1,
        center: mapCenter,
        radius: searchRadius,
        map: map,
      }));
    };
  }, [searchRadius]);

  useEffect(() => {
    if (searchCircle) {
      map!.fitBounds(searchCircle!.getBounds()!);
    }
  }, [searchCircle]);

  return (
    <div 
      id={"search-circle"}
    />
  );
};

export default SearchCircle;
