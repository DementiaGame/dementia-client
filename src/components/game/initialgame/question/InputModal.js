import React from "react";
import { FaTimes, FaMicrophone, FaPen } from "react-icons/fa";

const InputModal = ({
  modalType,
  answer,
  handleAnswerChange,
  closeModal,
  handleSubmitAnswer,
  handleRetry, // handleRetry를 prop으로 받음
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
            <p>{answer}</p>
            <button className="retry-button" onClick={handleRetry}>
              다시 말하기
            </button>
            <button className="submit-button" onClick={handleSubmitAnswer}>
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
              className="answer-input-field"
            />
            <button
              className="retry-button"
              onClick={() => handleAnswerChange({ target: { value: "" } })}
            >
              다시 쓰기
            </button>
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
