import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./InitialGameQuestions.css";
import {
  FaHeart,
  FaTimes,
  FaMicrophone,
  FaPen,
  FaSync,
  FaAngleRight,
} from "react-icons/fa";

const InitialGameQuestions = () => {
  const { topicName, userId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [remainingLives, setRemainingLives] = useState(3);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

  useEffect(() => {
    axios
      .post(`http://13.209.160.116:8080/api/initial/questions/${userId}`, {
        topicName,
      })
      .then((response) => {
        console.log("Data fetched successfully:", response.data);
        setQuestions(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setError(error.message);
      });
  }, [topicName, userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          handleSkipQuestion();
          return 30; // Reset timer for next question
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    if (answer === questions[currentQuestionIndex]?.answerWord) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTotalCorrectAnswers((prev) => prev + 1);
      setAnswer("");
      setTimer(30); // Reset timer for next question
      setRemainingLives(3); // Reset lives for next question
    } else {
      setRemainingLives((prevLives) => prevLives - 1);
      if (remainingLives <= 1) {
        handleSkipQuestion();
      }
    }
  };

  const handleSkipQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setAnswer("");
    setTimer(30); // Reset timer for next question
    setRemainingLives(3); // Reset lives for next question
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="initial-game-questions">
      <header className="header">
        <h1 className="title">143 초성게임({topicName})</h1>
        <button className="close-button">
          <FaTimes />
        </button>
      </header>
      <main className="main">
        <div className="question-board">
          <div className="topic-name">주제: {topicName}</div>
          <div className="consonant-quiz">{currentQuestion?.consonantQuiz}</div>
          <div className="timer">
            <div className="clock-icon">
              <span>{timer}</span>
            </div>
          </div>
        </div>
        <div className="lives">
          {Array.from({ length: totalCorrectAnswers }).map((_, index) => (
            <FaHeart key={index} color="red" />
          ))}
          {Array.from({ length: 10 - totalCorrectAnswers }).map((_, index) => (
            <FaHeart key={index} color="lightgrey" />
          ))}
        </div>
        <div className="remaining-chances">
          <span className="remaining-chances-text">
            남은 기회 {remainingLives}번!
          </span>
        </div>
        <div className="answer-inputs">
          <button className="chance-button" onClick={() => console.log("찬스")}>
            <FaSync /> 찬스
          </button>
          <button className="pass-button" onClick={handleSkipQuestion}>
            <FaAngleRight /> 패스
          </button>
          <button
            className="speak-button"
            onClick={() => console.log("말하기")}
          >
            <FaMicrophone /> 말하기
          </button>
          <button
            className="write-button"
            onClick={() => setShowInput(!showInput)}
          >
            <FaPen /> 쓰기
          </button>
          {showInput && (
            <div className="answer-input">
              <input
                type="text"
                value={answer}
                onChange={handleAnswerChange}
                placeholder="정답을 입력하세요"
              />
              <button onClick={handleSubmitAnswer}>
                <FaPen /> 쓰기
              </button>
            </div>
          )}
        </div>
        {error && <p className="error">Error: {error}</p>}
      </main>
    </div>
  );
};

export default InitialGameQuestions;
