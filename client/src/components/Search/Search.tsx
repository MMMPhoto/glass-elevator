import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { TextField, Button, Form } from "react-md";
import { LatLng, GoogleMap, Circle } from "../../types/types";

import "./Search.css";

interface SearchProps {
  map: GoogleMap,
  setMapCenter: Dispatch<SetStateAction<LatLng>>,
  setMapZoom: Dispatch<SetStateAction<number>>,
  setMapVisibility: Dispatch<SetStateAction<React.CSSProperties>>,
  searchCircle: Circle | undefined,
  setSearchCircle: Dispatch<SetStateAction<Circle | undefined>>,
  searchRadius: number
  setSearchRadius: Dispatch<SetStateAction<number>>
};

const Search = (props: SearchProps) => {

  const { map, setMapCenter, setMapZoom, setMapVisibility, searchCircle, setSearchCircle, searchRadius, setSearchRadius } = props;

  const [searchBox, setSearchBox] = useState<any>();
  const [chosenPlace, setChosenPlace] = useState<any>("");
  // const [searchRadius, setSearchRadius] = useState<number>();
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
        setChosenPlace(place);
      });
    };
  }, [searchBox]);

  const handleRadiusChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
    const radius = parseFloat(e.currentTarget.value)
    if (!Number.isNaN(radius)) {
      setSearchRadius(radius);
    };
  });

  const submitSearch = (() => {
    const location = { lat: chosenPlace.geometry.location.lat(), lng: chosenPlace.geometry.location.lng() };
    const meterRadius = searchRadius! * 1609.344; // convert miles to meters
    searchCircle?.setMap(null);
    setSearchCircle(new google.maps.Circle({
      strokeOpacity: 0,
      fillOpacity: 0.1,
      center: location,
      radius: meterRadius,
      map: map
    }));
    setSearchRadius(meterRadius);
    // setSearchCircle(radius);
    // const bounds = radius.getBounds()!;
    setMapCenter(location);
    // map.fitBounds(bounds, 0);
    // setMapZoom(map.getZoom()!);
    setMapVisibility({visibility: "visible"});
  });

  return (
    <Form
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
      }}
    >
      <TextField
      ref={ref}
      id="search"
      placeholder="Location"
      required
      // onChange={value => getPlace(value)}
      />
      <TextField
        id="radius"
        placeholder="Radius"
        required
        type="number"
        onChange={(e) => handleRadiusChange(e)}
      />
      <Button
        id="submit-search"
        onClick={() => submitSearch()}
      >
        Search
      </Button>
    </Form>
  );
};

export default Search;
