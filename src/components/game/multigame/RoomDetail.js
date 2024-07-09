import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RoomDetail.css";
import { FaAngleLeft, FaUserCircle, FaCog } from "react-icons/fa";

const RoomDetail = () => {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 방에 접속한 사용자 목록을 가져오는 API 호출
    fetch(
      `http://13.209.160.116:8080/api/multiplayer/room-users?roomId=${roomId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched users:", data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Users data is not an array:", data);
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  }, [roomId]);

  return (
    <div className="room-detail-container">
      <header className="room-detail-header">
        <FaAngleLeft className="back-icon" onClick={() => navigate(-1)} />
        <h1 className="room-detail-title">대기실 {roomId}</h1>
        <div className="header-icons">
          <FaUserCircle className="header-icon" />
          <FaCog className="header-icon" />
        </div>
      </header>
      <main className="room-detail-main">
        <div className="user-grid">
          {users.map((user) => (
            <div key={user.idx} className="user-card">
              <div className="user-avatar">{/* 아바타 이미지 추가 가능 */}</div>
              <h2 className="user-name">{user.userName}</h2>
              <p className="user-score">Score: {user.score}</p>
            </div>
          ))}
        </div>
        <button className="ready-button">준비 완료</button>
      </main>
    </div>
  );
};

export default RoomDetail;
