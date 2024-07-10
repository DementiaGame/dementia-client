import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "./MultiplayerGamePlay.css";
import {
  FaTimes,
  FaUserCircle,
  FaHeart,
  FaPlay,
  FaForward,
  FaCheck,
  FaTimesCircle,
} from "react-icons/fa";
import { userState } from "../../../recoil/userState"; // userState import

const MultiplayerGamePlay = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userState); // useRecoilValue로 currentUser 가져오기
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [users, setUsers] = useState([]);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showIncorrectModal, setShowIncorrectModal] = useState(false);

  useEffect(() => {
    // Fetch question
    fetch(`http://13.209.160.116:8080/api/multiplayer/generate-question`)
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data);
      })
      .catch((error) => console.error("Error fetching question:", error));

    // Fetch users in room
    fetch(
      `http://13.209.160.116:8080/api/multiplayer/room-users?roomId=${roomId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching room users:", error));
  }, [roomId]);

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    let correctAnswer;
    try {
      correctAnswer = eval(question.question);
    } catch (error) {
      console.error("Error evaluating question:", error);
      return;
    }

    if (question && parseInt(userAnswer) === correctAnswer) {
      setShowCorrectModal(true);
      setScore((prevScore) => prevScore + 1);
    } else {
      setShowIncorrectModal(true);
    }

    setTimeout(() => {
      setShowCorrectModal(false);
      setShowIncorrectModal(false);
      // Fetch new question
      fetch(`http://13.209.160.116:8080/api/multiplayer/generate-question`)
        .then((response) => response.json())
        .then((data) => {
          setQuestion(data);
          setUserAnswer("");
        })
        .catch((error) =>
          console.error("Error fetching next question:", error)
        );
    }, 2000);
  };

  const handleNumberClick = (number) => {
    setUserAnswer((prev) => prev + number);
  };

  const handleClearAnswer = () => {
    setUserAnswer("");
  };

  const handleDeleteLast = () => {
    setUserAnswer((prev) => prev.slice(0, -1));
  };

  return (
    <div className="game-container">
      <header className="game-header">
        <FaTimes className="close-icon" onClick={() => navigate(-1)} />
        <h1 className="game-title">멀티플레이 게임: 사칙 연산</h1>
      </header>
      <div className="game-body">
        <div className="user-list">
          {users.map((user) => (
            <div key={user.idx} className="user-item">
              <FaUserCircle className="user-icon" />
              <span className="user-name">{user.userName}</span>
              <span className="user-score">{user.score}</span>
              <div className="user-hearts">
                {Array(user.lives)
                  .fill()
                  .map((_, i) => (
                    <FaHeart key={i} className="heart-icon" />
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="question-container">
          {question && (
            <>
              <h2 className="question-text">{question.question}</h2>
              <input
                type="text"
                className="answer-input"
                value={userAnswer}
                onChange={handleAnswerChange}
                placeholder="?"
                readOnly
              />
            </>
          )}
        </div>
        <div className="keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button
              key={number}
              className="keypad-button"
              onClick={() => handleNumberClick(number.toString())}
            >
              {number}
            </button>
          ))}
          <button
            className="keypad-button clear-button"
            onClick={handleClearAnswer}
          >
            전체삭제
          </button>
          <button
            className="keypad-button"
            onClick={() => handleNumberClick("0")}
          >
            0
          </button>
          <button
            className="keypad-button delete-button"
            onClick={handleDeleteLast}
          >
            지우기
          </button>
        </div>
        <div className="button-container">
          <button className="action-button submit-button">
            찬스 <FaPlay />
          </button>
          <button
            className="action-button submit-button"
            onClick={handleSubmitAnswer}
          >
            제출 <FaPlay />
          </button>
        </div>
      </div>
      {showCorrectModal && (
        <div className="modal correct">
          <FaCheck className="modal-icon" />
          <p>정답이에요! 😍</p>
          <p>{score + 1}번째로 정답을 맞혔어요.</p>
        </div>
      )}
      {showIncorrectModal && (
        <div className="modal incorrect">
          <FaTimesCircle className="modal-icon" />
          <p>오답이에요. 😢</p>
          <p>다시 생각해보세요!</p>
        </div>
      )}
    </div>
  );
};

export default MultiplayerGamePlay;
