import { FC, ReactElement, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import MapsWrapper from "./components/MapsWrapper/MapsWrapper";

const App = () => {
  return (
    // <Router>
      <div className="App">
        <Header />
        <MapsWrapper />
        {/* <Routes>
          <Route path="/" element={<Search setSearchPlace={setSearchPlace} />} />
          <Route path="/map" element={<Map userLocation={userLocation} searchPlace={searchPlace} />} />
        </Routes> */}
      </div>
    // {/* </Router> */}
  );
};

export default App;
