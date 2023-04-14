import { useState, useRef, useEffect } from "react";
import { TextField } from "react-md";

const Search = ({}: {}) => {
  const [searchBox, setSearchBox] = useState<any>();
  const ref = useRef(null);

  const input = document.getElementById("search") as HTMLInputElement
  const options = {

  }
  console.log(google.maps.places)

  useEffect(() => {
    setSearchBox(new google.maps.places.Autocomplete(input, options))
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
