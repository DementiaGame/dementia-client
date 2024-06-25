import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./InitialGame.css";
import {
  FaAppleAlt,
  FaGlobe,
  FaLeaf,
  FaDog,
  FaPaw,
  FaHospital,
  FaGraduationCap,
  FaFutbol,
  FaCarrot,
  FaHamburger,
  FaUserTie,
  FaQuestion,
  FaMedal,
} from "react-icons/fa";

const PAGE_SIZE = 4; // 페이지당 항목 수
const userId = 1; // 임시 userId

const iconMap = {
  과일: <FaAppleAlt color="#FF6347" />,
  국가: <FaGlobe color="#4682B4" />,
  "국내 시, 군": <FaGlobe color="#228B22" />,
  꽃: <FaLeaf color="#FF69B4" />,
  나무: <FaLeaf color="#228B22" />,
  동물1: <FaDog color="#DAA520" />,
  동물2: <FaPaw color="#DAA520" />,
  "병원, 약, 병": <FaHospital color="#FF4500" />,
  사자성어: <FaGraduationCap color="#8A2BE2" />,
  스포츠: <FaFutbol color="#000000" />,
  야채: <FaCarrot color="#FF8C00" />,
  음식: <FaHamburger color="#FFD700" />,
  직업: <FaUserTie color="#4169E1" />,
  기본: <FaQuestion color="#808080" />,
};

const InitialGame = () => {
  const [topics, setTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://13.209.160.116:8080/api/initial/topics", {
        withCredentials: false, // 세션 쿠키를 전송하지 않음
      })
      .then((response) => {
        console.log("Data fetched successfully:", response.data);
        setTopics(response.data.data); // 응답 데이터 설정
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        setError(error.message);
      });
  }, []);

  const handleTopicClick = (topic) => {
    navigate(`/questions/${topic.topic}/${userId}`);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // 현재 페이지의 항목들을 계산
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedTopics = topics.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="initial-game">
      <header className="header">
        <button className="back-button">←</button>
        <h1 className="title">초성 퀴즈</h1>
        <button className="profile-button">⚙️</button>
      </header>
      <main className="main">
        <h2 className="subtitle">원하는 게임 주제를 고르세요!</h2>
        <div className="reward">
          <FaMedal className="medal-icon" />
          <p>143개의 하트를 모으면 박사 배지를 받을 수 있어요!</p>
        </div>
        <div className="topics">
          {paginatedTopics.map((topic, index) => (
            <div
              key={index}
              className="topic-card"
              onClick={() => handleTopicClick(topic)}
            >
              <div className="icon">
                {iconMap[topic.topic] || iconMap["기본"]}
              </div>
              <div className="details">
                <h3 className="title">{topic.topic}</h3>
              </div>
            </div>
          ))}
        </div>
        {error && <p className="error">Error: {error}</p>}
        <div className="pagination">
          {currentPage > 1 && <button onClick={handlePrevPage}>이전</button>}
          {startIndex + PAGE_SIZE < topics.length && (
            <button onClick={handleNextPage}>다음</button>
          )}
        </div>
        <button className="start-button">게임 시작</button>
      </main>
    </div>
  );
};

export default InitialGame;
