import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MemoryGame.css";
import banana from "./resources/banana.png";
import apple from "./resources/apple.png";
import grape from "./resources/grape.png";
import {
  FaHeart,
  FaPlay,
  FaForward,
  FaArrowLeft,
  FaUser,
  FaCog,
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
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState(10);

  useEffect(() => {
    const totalBlocks = rows * cols;
    const newBlocks = [];
    for (let i = 0; i < totalBlocks / 2; i++) {
      newBlocks.push(i, i);
    }
    setBlocks(newBlocks.sort(() => Math.random() - 0.5));
  }, [rows, cols]);

  const handleBlockClick = (index) => {
    if (flippedBlocks.length < 2 && !flippedBlocks.includes(index)) {
      setFlippedBlocks([...flippedBlocks, index]);
    }
  };

  useEffect(() => {
    if (flippedBlocks.length === 2) {
      const [firstIndex, secondIndex] = flippedBlocks;
      if (blocks[firstIndex] === blocks[secondIndex]) {
        setMessage("정답이에요! 😍");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setFlippedBlocks([]);
        }, 2000);
        axios.post("/api/memory-game-results", {
          userId: memoryGame.userId,
          memoryGameIdx: memoryGame.memoryGameIdx,
          isSuccessful: true,
        });
      } else {
        setMessage("오답이에요. 😢");
        setHearts(hearts - 1); // 틀릴 때마다 하트를 하나씩 삭제
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setFlippedBlocks([]);
        }, 2000);
      }
    }
  }, [flippedBlocks, blocks, memoryGame, hearts]);

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
              flippedBlocks.includes(index) ? "flipped" : ""
            }`}
            onClick={() => handleBlockClick(index)}
          >
            {flippedBlocks.includes(index) ? (
              <img src={fruitImages[block]} alt="fruit" />
            ) : (
              <span className="question-mark">?</span>
            )}
          </div>
        ))}
      </div>
      <div className="timer">29</div>
      <div className="actions">
        <button className="action-btn">
          찬스 <FaPlay />
        </button>
        <button className="action-btn">
          패스 <FaForward />
        </button>
      </div>
      {showMessage && (
        <div className="message-popup">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default MemoryGame;
