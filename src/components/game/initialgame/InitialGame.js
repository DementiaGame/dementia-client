import React, { useEffect, useState } from "react";
import axios from "axios";
import "./InitialGame.css";
import {
  FaApple,
  FaFish,
  FaDog,
  FaHospital,
  FaGlobe,
  FaDragon,
  FaCarrot,
  FaHamburger,
  FaUserMd,
  FaBasketballBall,
  FaCity,
  FaTree,
  FaQuestionCircle,
  FaLeaf,
} from "react-icons/fa";

const PAGE_SIZE = 8; // 페이지당 항목 수

const topicIcons = {
  과일: <FaApple color="red" />,
  "동물1(육지)": <FaDog color="brown" />,
  "동물2(물)": <FaFish color="blue" />,
  "병원,약,병": <FaHospital color="green" />,
  국가: <FaGlobe color="blue" />,
  사자성어: <FaDragon color="gold" />,
  야채: <FaCarrot color="orange" />,
  음식: <FaHamburger color="tan" />,
  직업: <FaUserMd color="darkblue" />,
  스포츠: <FaBasketballBall color="orange" />,
  "국내 시, 군": <FaCity color="gray" />,
  나무: <FaTree color="green" />,
  꽃: <FaLeaf color="pink" />, // "꽃" 항목이 react-icons에 없어 임시로 다른 아이콘 사용
  무작위: <FaQuestionCircle color="blue" />,
};

const InitialGame = () => {
  const [topics, setTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

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
    console.log(`Topic ${topic} clicked`);
    // TODO: 주제 클릭 시 필요한 동작 추가
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
        <h1 className="title">초성게임</h1>
        <button className="profile-button">⚙️</button>
      </header>
      <main className="main">
        <h2 className="subtitle">자신있는 주제를 고르세요</h2>
        <div className="reward">
          <p>143개의 하트를 모으면 박사 배지를 받을 수 있어요!</p>
        </div>
        <div className="topics">
          {paginatedTopics.map((topic, index) => (
            <div
              key={index}
              className="topic-card"
              onClick={() => handleTopicClick(topic.topic)}
            >
              <div className="icon">
                {topicIcons[topic.topic] || <FaQuestionCircle color="gray" />}
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
