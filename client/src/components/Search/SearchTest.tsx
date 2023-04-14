import { useState, useRef, useEffect } from "react";
import { TextField } from "react-md";

const Search = ({}: {}) => {
  const [searchBox, setSearchBox] = useState<any>();
  const ref = useRef(null);

  const options = {
    fields: ["address_components", "geometry", "icon", "name"],
  }
  console.log(google.maps.places)

  useEffect(() => {
    setSearchBox(new google.maps.places.Autocomplete(ref.current!, options))
  }, []);

  useEffect(() => {
  }, [searchBox]);

  return (
    <TextField
      ref={ref}
      id="search"
    />
  );
};

export default Search;
