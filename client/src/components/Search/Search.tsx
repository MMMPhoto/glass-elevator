import React, {  FC, useState, ChangeEvent, FormEvent } from "react";
import Autocomplete from "react-google-autocomplete";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
// import { Card, CardHeader, CardTitle, CardContent, CardActions } from "@react-md/card";
import { Form, TextField } from "@react-md/form";
// import { Button } from "@react-md/button";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../utils/api";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../utils/auth";
import { FormCard, FormContent, FormRow } from "./styles";
import { Container } from "../../styles/styles";
// import { useSelector, useDispatch } from 'react-redux';
// import { saveSavedPhotos, selectSavedPhotos } from "../../store/userSavedPhotosSlice";

// interface LoginData {
//   email: string,
//   password: string,
// };
const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Search: FC<{setSearchPlace: Function}> = (setSearchPlace) => {
  const [userFormData, setUserFormData] = useState<any>({ location: "", radius: "" });
  const navigate = useNavigate();
  // const navigate = useNavigate();

  // // Define React Redux functions
  // const userSavedPhotos = useSelector(selectSavedPhotos);
  // const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    if (e.cancelable) e.preventDefault();

  //   // check if form has everything (as per react-bootstrap docs)
  //   const form = e.currentTarget;
  //   if (form.checkValidity() === false) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   };

  //   try {
  //     const response = await loginUser(userFormData);

  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }
  //     setLogin(true);
  //     const { token, user } = await response.json();
  //     console.log(user);
  //     dispatch(saveSavedPhotos(user.savedPics));
  //     login(token);
  //     navigate("/");
  //   } catch (err) {
  //     console.error(err);
  //   };

  //   setUserFormData({
  //     email: "",
  //     password: "",
  //   });
  // };
  };

  const onPlaceSelected = ((place: any) => {
      setTimeout(() => {
        const location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        setSearchPlace.setSearchPlace(location);
      }, 1000);
      // Need Timeout to wait for state to update before component reload
      setTimeout(() => {
        navigate("/map");
      }, 3000);
  });

  return (
      <Container>
          {/* <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
                    <TextField
                id="location"
                name="location"
                label="Location:"
                value={userFormData.location}
                onChange={handleInputChange}
                type="text"
              />

          </PlacesAutocomplete> */}
            <Autocomplete
                apiKey={apiKey}
                onPlaceSelected={onPlaceSelected}
                // options={{ fields: ["geometry"]}}
              />
        {/* <FormCard> */}
          {/* <CardHeader>
            <CardTitle>Search Filter:</CardTitle>
          </CardHeader>
          <FormContent>
            <FormRow>
           */}
              <TextField
                id="location"
                name="location"
                label="Location:"
                value={userFormData.location}
                onChange={handleInputChange}
                type="text"
              />
              {/* // <TextField
                id="radius"
                name="radius"
                label="Search Radius:"
                value={userFormData.radius}
                onChange={handleInputChange}
                type="number"
              />
              <Button
                onClick={handleFormSubmit}
              > 
                Login
              </Button> */}
            {/* </FormRow> */}
            {/* <Card>
              <img
                src="https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_500/v1665696442/View-from-here/1ddfeb86305588512f79432b4a107ec5.jpg"
                className="img-fluid"
                alt="Sample view"
                id="loginFormImg"
              />
            </Card> */}
          {/* </FormContent>
        </FormCard> */}
      </Container>
  )
};

export default Search;
