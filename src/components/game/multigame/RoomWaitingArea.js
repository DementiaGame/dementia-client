import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RoomWaitingArea.css";
import { FaAngleLeft, FaUserCircle, FaCog } from "react-icons/fa";

const RoomWaitingArea = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    // 방의 사용자 목록을 가져오는 API 호출
    const fetchRoomData = () => {
      fetch(
        `http://13.209.160.116:8080/api/multiplayer/room-users?roomId=${roomId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => console.error("Error fetching users:", error));
    };

    // 방 정보를 가져오는 API 호출
    fetch(`http://13.209.160.116:8080/api/multiplayer/room/${roomId}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentRoom(data);
      })
      .catch((error) => console.error("Error fetching room info:", error));

    // 방 정보와 사용자 목록 주기적으로 업데이트
    const interval = setInterval(fetchRoomData, 3000);
    return () => clearInterval(interval);
  }, [roomId]);

  const handleStartGame = () => {
    fetch(
      `http://13.209.160.116:8080/api/multiplayer/start-game?roomId=${roomId}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (response.ok) {
          navigate(`/multiplayergame/play/${roomId}`);
        } else {
          console.error("Failed to start the game");
        }
      })
      .catch((error) => console.error("Error starting game:", error));
  };

  const isReadyToStart = users.length >= 2;

  return (
    <div className="waiting-container">
      <header className="waiting-header">
        <FaAngleLeft className="back-icon" onClick={() => navigate(-1)} />
        <h1 className="waiting-title">
          {currentRoom ? currentRoom.roomName : "대기실"}
        </h1>
        <div className="header-icons">
          <FaUserCircle className="header-icon" />
          <FaCog className="header-icon" />
        </div>
      </header>
      <main className="waiting-main">
        <div className="room-info">
          <h2>{`대기실 ${roomId}`}</h2>
          <p>{`${users.length} / 4`}</p>
        </div>
        <div className="user-cards">
          {users.map((user) => (
            <div key={user.idx} className="user-card">
              <div className="user-avatar">{user.userName[0]}</div>
              <div className="user-info">
                <p>{user.userName}</p>
                <p>❤️ {user.score}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <button
        className="start-button"
        onClick={handleStartGame}
        disabled={!isReadyToStart}
      >
        시작하기
      </button>
    </div>
  );
};

export default RoomWaitingArea;
