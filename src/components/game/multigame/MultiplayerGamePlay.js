import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "./MultiplayerGamePlay.css";
import { FaTimes } from "react-icons/fa";
import { userState } from "../../../recoil/userState"; // userState import

const MultiplayerGamePlay = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userState); // useRecoilValue로 currentUser 가져오기
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(`http://13.209.160.116:8080/api/multiplayer/generate-question`)
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data);
      })
      .catch((error) => console.error("Error fetching question:", error));
  }, [roomId]);

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    fetch(`http://13.209.160.116:8080/api/multiplayer/submit-answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser.userIdx, // currentUser를 사용하여 userId 설정
        questionId: question.questionIdx,
        answer: userAnswer,
      }),
    })
      .then((response) => response.json())
      .then((isCorrect) => {
        if (isCorrect) {
          setScore((prevScore) => prevScore + 1);
          fetch(`http://13.209.160.116:8080/api/multiplayer/generate-question`)
            .then((response) => response.json())
            .then((data) => {
              setQuestion(data);
              setUserAnswer("");
            })
            .catch((error) =>
              console.error("Error fetching next question:", error)
            );
        } else {
          console.error("Wrong answer");
        }
      })
      .catch((error) => console.error("Error submitting answer:", error));
  };

  return (
    <div className="game-container">
      <header className="game-header">
        <FaTimes className="close-icon" onClick={() => navigate(-1)} />
        <h1 className="game-title">멀티플레이 게임: 사칙 연산</h1>
      </header>
      <div className="game-body">
        <div className="user-list">
          {/* 여기에 현재 방에 참여한 사용자들을 표시 */}
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
                placeholder="답을 입력하세요"
              />
            </>
          )}
        </div>
        <div className="button-container">
          <button className="submit-button" onClick={handleSubmitAnswer}>
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerGamePlay;
