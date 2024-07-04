import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameMain from "./components/game/GameMain";
import InitialGame from "./components/game/initialgame/topics/InitialGame";
import InitialGameQuestions from "./components/game/initialgame/question/InitialGameQuestions";
import SignIn from "./user/SignIn";
import BirthdayStep from "./user/BirthyearStep";
import GenderStep from "./user/GenderStep";
import NickNameStep from "./user/NickNameStep";
import PasswordStep from "./user/PasswordStep";
import CompleteSignUp from "./user/CompleteSignup";
import Setting from "./user/Setting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/gamemain" element={<GameMain />} />
        <Route path="/initialgame" element={<InitialGame />} />
        <Route path="/questions/:userId" element={<InitialGameQuestions />} />
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/signup/birthyear-step" element={<BirthdayStep />}/>
        <Route path="/signup/gender-step" element={<GenderStep />}/>
        <Route path="/signup/nickname-step" element={<NickNameStep />}/>
        <Route path="/signup/password-step" element={<PasswordStep />}/>
        <Route path="/signup/complete-signup" element={<CompleteSignUp />}/>
        <Route path="/user/setting" element={<Setting />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
