import styled from "styled-components";
// import { AppBar, AppBarTitle, AppBarNav } from "@react-md/app-bar";
// import { NavLink } from "react-router-dom";

export const HeaderBar = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-position: center;
  background-color: #000;
  width: 100.9%;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

export const Title = styled.h1`
  color: #FFF;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12vw;
  font-style: italic;
  opacity: 90%;
  text-shadow: 3px 3px 3px black;
  width: 100%;
  @media (min-width: 600px) {
    font-size: 6vh;
    flex-direction: row;
    width: 40%;
  }
`;

// export const NavBar = styled.nav`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   @media (min-width: 300px) {
//     flex-direction: row;
//     justify-content: space-around;
//     width: 100%;
//   }
//   @media (min-width: 600px) {
//     width: 40%;
//   }
// `;

// export const NavElem = styled(NavLink)`
//   text-decoration: none;
//   color: #FFF;
//   font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
//   &:hover {
//     color: #8282fe;
//     text-shadow: 2px 2px 10px black;
//   }
// `;
