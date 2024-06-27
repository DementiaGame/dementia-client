import React from "react";
import { FaTimes, FaMicrophone, FaPen } from "react-icons/fa";

const InputModal = ({
  modalType,
  answer,
  handleAnswerChange,
  closeModal,
  handleSubmitAnswer,
  recognition, // recognition을 prop으로 받음
}) => {
  const renderContent = () => {
    if (modalType === "speak") {
      return (
        <>
          <div className="modal-icon">
            <FaMicrophone />
          </div>
          <div className="modal-body">
            <h2>정답을 말하세요.</h2>
            <p>음성 인식 중...</p>
            <button
              className="retry-button"
              onClick={() => recognition.start()}
            >
              다시 말하기
            </button>
            <button className="submit-button" onClick={closeModal}>
              완료
            </button>
          </div>
        </>
      );
    } else if (modalType === "write") {
      return (
        <>
          <div className="modal-icon">
            <FaPen />
          </div>
          <div className="modal-body">
            <h2>정답을 입력하세요.</h2>
            <input
              type="text"
              placeholder="정답 입력"
              value={answer}
              onChange={handleAnswerChange}
            />
            <button className="retry-button">다시 쓰기</button>
            <button className="submit-button" onClick={handleSubmitAnswer}>
              완료
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="modal">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-container">
        <button className="close-button" onClick={closeModal}>
          <FaTimes />
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default InputModal;
