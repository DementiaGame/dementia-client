import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InitialGame from "./components/game/initialgame/InitialGame";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialGame />} />
      </Routes>
    </Router>
  );
};

export default App;
