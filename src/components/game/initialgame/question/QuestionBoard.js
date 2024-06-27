import React from "react";

const QuestionBoard = ({ topicName, consonantQuiz, timer }) => (
  <div className="question-board">
    <div className="topic-name">주제: {topicName}</div>
    <div className="consonant-quiz">{consonantQuiz}</div>
    <div className="timer">
      <div className="clock-icon">
        <span>{timer}</span>
      </div>
    </div>
  </div>
);

export default QuestionBoard;
