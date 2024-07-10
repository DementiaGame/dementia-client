import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MemoryGame.css";
import banana from "./resources/Frame_159.png";
import apple from "./resources/Frame_163.png";
import grape from "./resources/Frame_158.png";
import timerImage from "./resources/timer.png";
import timeoutImage from "./resources/timeout.png";
import questionImage from "./resources/question.png";
import errorImage from "./resources/Frame_95.png";
import {
  FaHeart,
  FaPlay,
  FaForward,
  FaArrowLeft,
  FaUser,
  FaCog,
  FaCheckCircle,
} from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { memoryGameState } from "../../../recoil/userState";

const fruitImages = [banana, apple, grape];

function MemoryGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rows, cols } = location.state;
  const memoryGame = useRecoilValue(memoryGameState);
  const [blocks, setBlocks] = useState([]);
  const [flippedBlocks, setFlippedBlocks] = useState([]);
  const [matchedBlocks, setMatchedBlocks] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState(10);
  const [timer, setTimer] = useState(30);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setShowTimeoutModal(true);
    }
  }, [timer]);

  useEffect(() => {
    const totalBlocks = rows * cols;
    const newBlocks = [];
    for (let i = 0; i < totalBlocks / 2; i++) {
      newBlocks.push(i % fruitImages.length, i % fruitImages.length);
    }
    setBlocks(newBlocks.sort(() => Math.random() - 0.5));
  }, [cols, rows]);

  const handleBlockClick = (index) => {
    if (
      flippedBlocks.length < 2 &&
      !flippedBlocks.includes(index) &&
      !matchedBlocks.includes(index)
    ) {
      setFlippedBlocks([...flippedBlocks, index]);
    }
  };

  const getBlockSize = (state) => {
    if (state.name === "쉬움") {
      return "easy-block";
    }

    if (state.name === "보통") {
      return "normal-block";
    }

    return "hard-block";
  };

  const getQuestionImageHeight = (state) => {
    if (state.name === "쉬움") {
      return undefined;
    }

    if (state.name === "보통") {
      return "question-image-normal";
    }

    return "question-image-hard";
  };

  useEffect(() => {
    if (flippedBlocks.length === 2) {
      const [firstIndex, secondIndex] = flippedBlocks;
      if (blocks[firstIndex] === blocks[secondIndex]) {
        setMessage("정답입니다! 😍");
        setIsCorrect(true);
        setMatchedBlocks((prev) => {
          const updatedMatchedBlocks = [...prev, firstIndex, secondIndex];
          if (updatedMatchedBlocks.length === blocks.length) {
            setTimeout(() => {
              setShowCongratulations(true);
            }, 500);
          }
          return updatedMatchedBlocks;
        });
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setFlippedBlocks([]);
        }, 2000);
      } else {
        setMessage("오답입니다. 😢");
        setIsCorrect(false);
        setHearts((prevHearts) => prevHearts - 1); // 틀릴 때마다 하트를 하나씩 삭제
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setFlippedBlocks([]);
        }, 2000);
      }
    }
  }, [flippedBlocks, blocks]);

  return (
    <div className="memory-game">
      <header className="header">
        <FaArrowLeft className="header-icon" onClick={() => navigate(-1)} />
        <h1>기억력 게임</h1>
        <div className="header-right">
          <FaUser className="header-icon" />
          <FaCog className="header-icon" />
        </div>
      </header>
      <div className="hearts">
        {Array(hearts)
          .fill()
          .map((_, i) => (
            <span key={i} className="heart">
              <FaHeart />
            </span>
          ))}
      </div>
      <div
        className="blocks"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {blocks.map((block, index) => (
          <div
            key={index}
            className={`block ${
              flippedBlocks.includes(index) || matchedBlocks.includes(index)
                ? "flipped"
                : ""
            } ${getBlockSize(location.state)}`}
            onClick={() => handleBlockClick(index)}
          >
            {flippedBlocks.includes(index) || matchedBlocks.includes(index) ? (
              <img src={fruitImages[block]} alt="fruit" />
            ) : (
              <div className="question-mark">
                <img
                  src={questionImage}
                  alt={"?"}
                  className={`question-image ${getQuestionImageHeight(
                    location.state
                  )}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="timer">
        <img src={timerImage} alt="clock" className="clock-image" />
        <span className="timer-number">{timer}</span>
      </div>
      <div className="actions">
        <button className="action-btn">
          <span style={{ marginRight: "7px" }}>찬스</span> <FaPlay />
        </button>
        <button className="action-btn">
          <span style={{ marginRight: "7px" }}>패스</span> <FaForward />
        </button>
      </div>
      {showMessage && (
        <div
          className={`message-popup slide-up ${
            isCorrect ? "correct" : "error"
          }`}
        >
          <div>
            {isCorrect ? (
              <FaCheckCircle className="correct-icon" />
            ) : (
              <img src={errorImage} alt="error" />
            )}
          </div>
          <p className="error-message">{message}</p>
          {isCorrect && <p className="correct-message">정답입니다!</p>}
          {!isCorrect && (
            <p className="error-subtext">{hearts}번의 기회가 남았어요.</p>
          )}
        </div>
      )}
      {showTimeoutModal && (
        <div className="timeout-modal">
          <div className="timeout-content">
            <img src={timeoutImage} alt="timeout" />
            <h2>타임아웃</h2>
            <p>제한 시간이 다 되었어요.</p>
            <button onClick={() => navigate(-1)}>확인</button>
          </div>
        </div>
      )}
      {showCongratulations && (
        <div className="congratulations-modal">
          <div className="congratulations-content">
            <FaHeart className="congratulations-icon" />
            <p className="congratulations-message">축하합니다!</p>
            <p>
              지금까지 <strong>20개의 하트</strong>를 받았어요.{" "}
              <strong>11개</strong>를 더 얻으면{" "}
              <strong>기억력 박사 뱃지</strong>를 얻을 수 있어요.
            </p>
            <button onClick={() => navigate("/gamemain")}>이만 끝내기</button>
            <button onClick={() => setShowCongratulations(false)}>
              계속하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemoryGame;
