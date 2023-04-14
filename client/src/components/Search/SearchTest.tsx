import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { TextField } from "react-md";

import { Position } from "../../types/Position";
import "./Search.css";

  const Search = ({ setMapCenter }: {setMapCenter: Dispatch<SetStateAction<Position>>}) => {
  const [searchBox, setSearchBox] = useState<any>();
  const [chosenPlace, setChosenPlace] = useState<any>("");
  const ref = useRef(null);

  const options = {
    fields: ["address_components", "geometry", "icon", "name"],
  }

  useEffect(() => {
    setSearchBox(new google.maps.places.Autocomplete(ref.current!, options))
  }, []);

  useEffect(() => {
    if (searchBox) {
      searchBox.addListener("place_changed", () => {
        const place = searchBox.getPlace();
        const location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        console.log(location);
        setChosenPlace(place);
        setMapCenter(location);
      });
    }
  }, [searchBox]);

  // const getPlace = (value: any) => {
  //   const place = searchBox.getPlace(value);
  //   console.log(place);
  // };

  return (
    <TextField
      ref={ref}
      id="search"
      style={{width: "100%"}}
      // onChange={value => getPlace(value)}
    />
  );
};

export default Search;
