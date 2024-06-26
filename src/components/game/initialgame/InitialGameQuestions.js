import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState(location.state?.questions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [remainingLives, setRemainingLives] = useState(3);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

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
      setTotalCorrectAnswers((prev) => prev + 1);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setAnswer("");
      setTimer(30); // Reset timer for next question
      setRemainingLives(3); // Reset lives for next question
    } else {
      setRemainingLives((prevLives) => {
        if (prevLives - 1 <= 0) {
          handleSkipQuestion();
          return 3; // Reset lives for next question
        } else {
          return prevLives - 1;
        }
      });
    }
  };

  const handleSkipQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setAnswer("");
    setTimer(30); // Reset timer for next question
    setRemainingLives(3); // Reset lives for next question
  };

  const handleSpeakClick = () => {
    setModalType("speak");
    setShowModal(true);
  };

  const handleWriteClick = () => {
    setModalType("write");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderModalContent = () => {
    if (modalType === "speak") {
      return (
        <div className="modal-content">
          <button className="close-button" onClick={closeModal}>
            <FaTimes />
          </button>
          <div className="modal-icon">
            <FaMicrophone />
          </div>
          <div className="modal-body">
            <h2>정답을 말하세요.</h2>
            <p>사과</p>
            <button className="retry-button">다시 말하기</button>
            <button className="submit-button" onClick={closeModal}>
              완료
            </button>
          </div>
        </div>
      );
    } else if (modalType === "write") {
      return (
        <div className="modal-content">
          <button className="close-button" onClick={closeModal}>
            <FaTimes />
          </button>
          <div className="modal-icon">
            <FaPen />
          </div>
          <div className="modal-body">
            <h2>정답을 입력하세요.</h2>
            <input
              type="text"
              placeholder="정답 입력"
              onChange={handleAnswerChange}
            />
            <button className="retry-button">다시 쓰기</button>
            <button className="submit-button" onClick={handleSubmitAnswer}>
              완료
            </button>
          </div>
        </div>
      );
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="initial-game-questions">
      <header className="header">
        <h1 className="title">143 초성게임({currentQuestion.topicName})</h1>
        <button className="close-button" onClick={() => navigate("/")}>
          <FaTimes />
        </button>
      </header>
      <main className="main">
        <div className="question-board">
          <div className="topic-name">주제: {currentQuestion.topicName}</div>
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
          <button className="speak-button" onClick={handleSpeakClick}>
            <FaMicrophone /> 말하기
          </button>
          <button className="write-button" onClick={handleWriteClick}>
            <FaPen /> 쓰기
          </button>
        </div>
        {error && <p className="error">Error: {error}</p>}
      </main>
      {showModal && (
        <div className="modal">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-container">{renderModalContent()}</div>
        </div>
      )}
    </div>
  );
};

export default InitialGameQuestions;
