import React from "react";
import { useNavigate } from "react-router-dom";
import "./DifficultySelection.css";
import {
  FaHeart,
  FaMedal,
  FaAngleLeft,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";

const levels = [
  { name: "쉬움", rows: 3, cols: 2, hearts: 9999 },
  { name: "보통", rows: 4, cols: 3, hearts: 1432 },
  { name: "어려움", rows: 4, cols: 4, hearts: 0 },
];

function DifficultySelection() {
  const navigate = useNavigate();

  const handleLevelSelect = (level) => {
    navigate("/memorygame/play", { state: level });
  };

  return (
    <div className="difficulty-selection">
      <header className="header">
        <FaAngleLeft className="header-icon" onClick={() => navigate(-1)} />
        <span className="header-title">이전으로</span>
        <div className="header-right">
          <FaUserCircle className="header-icon" />
          <FaCog className="header-icon" />
        </div>
      </header>
      <div className="content">
        <h1>원하는 난이도를 고르세요</h1>
        <div className="info-box">
          <FaMedal className="info-icon" />
          <p>난이도가 높을수록 많은 하트를 얻을 수 있어요!</p>
        </div>
        <div className="levels">
          {levels.map((level) => (
            <div
              key={level.name}
              className="level"
              onClick={() => handleLevelSelect(level)}
            >
              <h2>{level.name}</h2>
              <p>
                {level.rows} x {level.cols}
              </p>
              <p>
                <FaHeart /> {level.hearts.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <button className="start-button">게임 시작</button>
      </div>
    </div>
  );
}

export default DifficultySelection;
