import styled from "styled-components";
// import { AppBar, AppBarTitle, AppBarNav } from "@react-md/app-bar";
// import { NavLink } from "react-router-dom";

export const HeaderBar = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-position: center;
  background-color: #FFF;
  width: 100%;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

export const Title = styled.h1`
  color: #000;
  font-family: 'Futura', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: clamp(16px, 8vw, 30px);
  opacity: 90%;
  text-shadow: 1px 1px 1px black;
  width: 80%;
  @media (min-width: 600px) {
    flex-direcion: row;
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
