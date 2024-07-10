import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RoomWaitingArea.css";
import { FaAngleLeft, FaUserCircle } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userState";

const RoomWaitingArea = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [user] = useRecoilState(userState); // 현재 사용자 정보

  useEffect(() => {
    fetch(`http://13.209.160.116:8080/api/multiplayer/room/${roomId}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentRoom(data);
      })
      .catch((error) => console.error("Error fetching room info:", error));

    fetch(
      `http://13.209.160.116:8080/api/multiplayer/room-users?roomId=${roomId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching room users:", error));
  }, [roomId]);

  const handleStartGame = async () => {
    try {
      const response = await fetch(
        `http://13.209.160.116:8080/api/multiplayer/start-game`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomId: Number(roomId) }), // body에 JSON 형식으로 roomId 추가
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("Failed to start the game", text);
        return;
      }

      const data = await response.json();
      console.log("Game started successfully", data);
      navigate(`/multiplayergame/play/${roomId}`);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const handleLeaveRoom = () => {
    fetch(`http://13.209.160.116:8080/api/multiplayer/leave-room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId: Number(roomId), userId: user.userIdx }), // body에 JSON 형식으로 roomId와 userId 추가
    })
      .then(() => {
        navigate(-1); // 이전 페이지로 이동
      })
      .catch((error) => console.error("Error leaving room:", error));
  };

  const isReadyToStart = users.length >= 2;

  return (
    <div className="waiting-container">
      <header className="waiting-header">
        <FaAngleLeft className="back-icon" onClick={handleLeaveRoom} />
        <h1 className="waiting-title">
          {currentRoom ? currentRoom.roomName : "대기실"}
        </h1>
      </header>
      <div className="waiting-body">
        <h2 className="subtitle">방에 참여한 인원</h2>
        <div className="user-list">
          {users.map((user) => (
            <div key={user.idx} className="user-item">
              <FaUserCircle className="user-icon" />
              <span className="user-name">{user.userName}</span>
              <span className="user-score">❤️ {user.score}</span>{" "}
            </div>
          ))}
        </div>
        <div className="waiting-info">
          <p>{users.length} / 4</p>
          {isReadyToStart && (
            <button className="start-button" onClick={handleStartGame}>
              준비 완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomWaitingArea;
