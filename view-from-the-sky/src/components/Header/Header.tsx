import React from "react";
import { 
  HeaderBar,
  Title, 
  // NavBar, 
  // NavElem
} from "./styles";


const Header = () => {
  return (
    <HeaderBar>
        <Title>
          Glass Elevator
        </Title>          
        {/* {props.loggedIn
          ? <NavBar>
              <NavElem to="/" end>
                Home
              </NavElem>
              <NavElem
                onClick={logout}
                to="signup"
              >
                Logout
              </NavElem>
              <NavElem to="/profile">
                Profile
              </NavElem>
            </NavBar>
          : <NavBar>
              <NavElem to="/" end>
                Home
              </NavElem>
              <NavElem to="/login">
                Login
              </NavElem>
              <NavElem to="/signup">
                Signup
              </NavElem>
            </NavBar>
          } */}
    </HeaderBar>
  );
};

export default Header;
