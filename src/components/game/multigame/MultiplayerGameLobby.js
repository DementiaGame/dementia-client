import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "./MultiplayerGameLobby.css";
import {
  FaAngleLeft,
  FaUserCircle,
  FaCog,
  FaUserFriends,
} from "react-icons/fa";
import CreateRoomModal from "./CreateRoomModal";
import { userState } from "../../../recoil/userState";

const ITEMS_PER_PAGE = 4;

const MultiplayerGameLobby = () => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomUsers, setRoomUsers] = useState({}); // 방별 현재 인원 수 상태 추가
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userState);

  useEffect(() => {
    fetch("http://13.209.160.116:8080/api/multiplayer/rooms")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched rooms:", data);
        if (Array.isArray(data)) {
          setRooms(data);
          // 각 방의 현재 인원을 조회하여 상태에 저장
          data.forEach((room) => {
            fetch(
              `http://13.209.160.116:8080/api/multiplayer/room-users?roomId=${room.roomIdx}`
            )
              .then((response) => response.json())
              .then((usersData) => {
                setRoomUsers((prevState) => ({
                  ...prevState,
                  [room.roomIdx]: usersData.length,
                }));
              })
              .catch((error) =>
                console.error(
                  `Error fetching users for room ${room.roomIdx}:`,
                  error
                )
              );
          });
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
    if (!currentUser.userIdx) {
      console.error("User is not logged in.");
      return;
    }

    fetch("http://13.209.160.116:8080/api/multiplayer/join-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, userId: currentUser.userIdx }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Joined room:", data);
        navigate(`/multiplayergame/room/${roomId}`);
      })
      .catch((error) => console.error("Error joining room:", error));
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

  const totalPages = Math.ceil(rooms.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedRooms = rooms.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="lobby-container">
      <header className="lobby-header">
        <FaAngleLeft className="back-icon" onClick={() => navigate(-1)} />
        <div className="header-icons-left">
          <FaUserCircle className="header-icon" />
        </div>
        <h1 className="lobby-title">대기실 목록</h1>
        <div className="header-icons-right">
          <FaCog className="header-icon" />
        </div>
      </header>
      <main className="lobby-main">
        <div className="room-grid">
          {selectedRooms.map((room) => (
            <div
              key={room.roomIdx}
              className="room-card"
              onClick={() => handleRoomClick(room.roomIdx)}
            >
              <FaUserFriends className="room-icon" />
              <h2 className="room-title">{room.roomName}</h2>
              <p className="room-capacity">{`${
                roomUsers[room.roomIdx] || 0
              } / 4`}</p>{" "}
              {/* 현재 인원 표시 */}
            </div>
          ))}
        </div>
        <button
          className="create-room-button"
          onClick={() => setShowModal(true)}
        >
          방 만들기
        </button>
        <div className="pagination">
          <button
            className="pagination-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            이전
          </button>
          <button
            className="pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            다음
          </button>
        </div>
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
