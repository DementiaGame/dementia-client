import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MultiplayerGameLobby.css";
import { FaAngleLeft } from "react-icons/fa";
import CreateRoomModal from "./CreateRoomModal"; // 모달 컴포넌트 import

const MultiplayerGameLobby = () => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 방 목록을 가져오는 API 호출 (예시)
    fetch("http://13.209.160.116:8080/api/multiplayer/rooms")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched rooms:", data);
        // 응답이 배열인지 확인
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          console.error("Rooms data is not an array:", data);
          setRooms([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setRooms([]);
      });
  }, []);

  const handleRoomClick = (roomId) => {
    navigate(`/multiplayergame/room/${roomId}`);
  };

  const handleCreateRoom = (roomName) => {
    console.log("Creating room with name:", roomName);
    fetch("http://13.209.160.116:8080/api/multiplayer/create-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Created room:", data);
        navigate(`/multiplayergame/room/${data.roomIdx}`);
      })
      .catch((error) => console.error("Error creating room:", error));
  };

  return (
    <div className="lobby-container">
      <header className="lobby-header">
        <FaAngleLeft className="back-icon" onClick={() => navigate(-1)} />
        <h1 className="lobby-title">대기실 목록</h1>
      </header>
      <main className="lobby-main">
        <button
          className="create-room-button"
          onClick={() => setShowModal(true)}
        >
          방 만들기
        </button>
        {rooms.map((room) => (
          <div
            key={room.roomIdx}
            className="room-card"
            onClick={() => handleRoomClick(room.roomIdx)}
          >
            <h2 className="room-title">{`대기실 ${room.roomIdx}`}</h2>
            <p className="room-capacity">{`${room.currentUsers} / ${room.maxUsers}`}</p>
          </div>
        ))}
      </main>
      {showModal && (
        <CreateRoomModal
          onClose={() => setShowModal(false)}
          onCreate={(roomName) => {
            handleCreateRoom(roomName);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default MultiplayerGameLobby;
