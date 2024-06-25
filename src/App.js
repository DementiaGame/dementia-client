import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InitialGame from "./components/game/initialgame/InitialGame";
import InitialGameQuestions from "./components/game/initialgame/InitialGameQuestions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialGame />} />
        <Route
          path="/questions/:topicName/:userId"
          element={<InitialGameQuestions />}
        />
      </Routes>
    </Router>
  );
}

export default App;
