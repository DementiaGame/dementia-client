import React, { useState } from "react";
import "./CreateRoomModal.css";

const CreateRoomModal = ({ onClose, onCreate }) => {
  const [roomName, setRoomName] = useState("");

  const handleCreate = () => {
    if (roomName.trim()) {
      console.log("Room name entered:", roomName);
      onCreate(roomName);
    } else {
      console.error("Room name is empty");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>방 만들기</h2>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="방 이름을 입력하세요"
        />
        <div className="modal-buttons">
          <button onClick={onClose}>취소</button>
          <button onClick={handleCreate}>생성</button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;
