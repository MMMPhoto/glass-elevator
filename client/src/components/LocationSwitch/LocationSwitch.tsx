import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { Form, AsyncSwitch, Checkbox, useChecked } from "@react-md/form";
import { LatLng, GoogleMap, Circle } from "../../types/types";

const LocationSwitch = ({handleUserLocation, userLocation, setUserLocation, setMapVisibility, locationPermissionStatus}: {
    handleUserLocation: ()=>Promise<any>,
    userLocation: LatLng | undefined,
    setUserLocation: Dispatch<SetStateAction<LatLng | undefined>>,
    setMapVisibility: Dispatch<SetStateAction<React.CSSProperties>>,
    locationPermissionStatus: string
  }) => {

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (locationPermissionStatus === "granted") {
      setLoading(true);
      setChecked(true);
    }
  }, []);

  useEffect(() => {
    if (userLocation) setLoading(false);
  }, [userLocation]);

  const handleLocationQuery = async () => {
    try {
      if (!checked) {
        setChecked(true);
        setLoading(true);
        const result = await handleUserLocation();
        console.log(result);
        // Give 1 sec to show loading animation
          if (result) {
            // console.log("result good")
            setLoading(false);
          } else {
            // console.log("result bad")
            setTimeout(() => {
              setLoading(false);
              setChecked(false);
            }, 1000);
          };
      } else {
        // console.log("unchecking");
        setChecked(false);
        setUserLocation(undefined);
        setMapVisibility({visibility: "hidden"});
      };
    } catch(err: any) {
      console.error(`Error: ${err.message}`);
    };
  };

  return (
    <Form style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems:"center"}}>
      <p>Search</p>
      <AsyncSwitch
        id="async-switch"
        name="switch"
        label="Use My Location"
        loading={loading}
        onChange={() => handleLocationQuery()}
        checked={checked}
      />
    </Form>
  )
};

export default LocationSwitch;
