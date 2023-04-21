import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { Form, AsyncSwitch, Checkbox, useChecked } from "@react-md/form";
import { useTimeout } from "@react-md/utils";

type LatLng = google.maps.LatLngLiteral;
type GoogleMap = google.maps.Map;

const LocationSwitch = () => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [fail, handleFailChange] = useChecked(false);
  const [start] = useTimeout(() => {
    setLoading(false);
    if (fail) {
      setChecked((prevChecked) => !prevChecked);
    }
  }, 5000);

  return (
    <Form style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
      {/* <Checkbox
        id="async-switch-fail"
        label={'Fail the "API" call'}
        checked={fail}
        onChange={handleFailChange}
      /> */}
      <AsyncSwitch
        id="async-switch"
        name="switch"
        label="Use My Location"
        loading={loading}
        onChange={(event) => {
          start();
          setLoading(true);
          setChecked(event.currentTarget.checked);
        }}
        checked={checked}
      />
    </Form>
  )
};

export default LocationSwitch;
