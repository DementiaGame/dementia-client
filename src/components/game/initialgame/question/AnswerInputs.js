import React from "react";
import { FaSync, FaAngleRight, FaMicrophone, FaPen } from "react-icons/fa";

const AnswerInputs = ({ onSpeakClick, onWriteClick, onSkipQuestion }) => (
  <div className="answer-inputs">
    <button className="chance-button" onClick={() => console.log("찬스")}>
      <FaSync /> 찬스
    </button>
    <button className="pass-button" onClick={onSkipQuestion}>
      <FaAngleRight /> 패스
    </button>
    <button className="speak-button" onClick={onSpeakClick}>
      <FaMicrophone /> 말하기
    </button>
    <button className="write-button" onClick={onWriteClick}>
      <FaPen /> 쓰기
    </button>
  </div>
);

export default AnswerInputs;
