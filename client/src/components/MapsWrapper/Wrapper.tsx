import { FC, useState } from "react";
import Map from "../Map/Map";

const MapsWrapper: FC<{}> = () => {

  // Set Map State
  const [map, setMap] = useState<google.maps.Map>();



  return(
    <p>Map!</p>
  );
};

export default MapsWrapper;
