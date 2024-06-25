import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GameMain.css";
import firstIcon from "./resources/first.png"; // 첫 번째 아이콘
import secondIcon from "./resources/second.png"; // 두 번째 아이콘
import thirdIcon from "./resources/third.png"; // 세 번째 아이콘
import { FaAngleRight, FaCog, FaUserCircle } from "react-icons/fa";

const GameMain = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

  const handleGameClick = (game) => {
    setSelectedGame(game);
    if (game === "초성게임") {
      navigate("/initialgame");
    }
    // 다른 게임의 경우 다른 경로로 이동
  };

  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="game-main">
      <header className="header">
        <FaUserCircle className="header-icon" />
        <FaCog className="header-icon" />
      </header>
      <div className="date-title">
        <div className="date">{dateString}</div>
        <h1 className="title">게임을 선택해주세요</h1>
      </div>
      <main className="main">
        <div
          className={`game-card ${
            selectedGame === "초성게임" ? "selected" : ""
          }`}
          onClick={() => handleGameClick("초성게임")}
        >
          <div className="icon-wrapper">
            <img src={firstIcon} alt="초성게임" className="icon" />
            <div className="game-info">
              <div className="game-time">단어를 맞추는</div>
              <div className="game-title">초성게임</div>
            </div>
          </div>
          <FaAngleRight className="arrow-icon" />
        </div>
        <div
          className={`game-card ${
            selectedGame === "기억력 게임" ? "selected" : ""
          }`}
          onClick={() => handleGameClick("기억력 게임")}
        >
          <div className="icon-wrapper">
            <img src={secondIcon} alt="기억력 게임" className="icon" />
            <div className="game-info">
              <div className="game-time">같은 그림을 찾는</div>
              <div className="game-title">기억력 게임</div>
            </div>
          </div>
          <FaAngleRight className="arrow-icon" />
        </div>
        <div
          className={`game-card ${
            selectedGame === "멀티 플레이어 게임" ? "selected" : ""
          }`}
          onClick={() => handleGameClick("멀티 플레이어 게임")}
        >
          <div className="icon-wrapper">
            <img src={thirdIcon} alt="멀티 플레이어 게임" className="icon" />
            <div className="game-info">
              <div className="game-time">여러명이 즐기는</div>
              <div className="game-title">사칙연산 게임</div>
            </div>
          </div>
          <FaAngleRight className="arrow-icon" />
        </div>
      </main>
    </div>
  );
};

export default GameMain;
