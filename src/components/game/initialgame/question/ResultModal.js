import React from "react";
import { FaTimes, FaHeart } from "react-icons/fa";

const ResultModal = ({ totalCorrectAnswers, closeModal, onContinue }) => {
  return (
    <div className="modal">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-container">
        <button className="close-button" onClick={closeModal}>
          <FaTimes />
        </button>
        <div className="modal-content">
          <div className="modal-icon">
            <FaHeart color="red" />
            <span> X {totalCorrectAnswers}</span>
          </div>
          <div className="modal-body">
            <h2>축하합니다!</h2>
            <p>지금까지 {totalCorrectAnswers * 10}개의 하트를 받았어요.</p>
            <button className="retry-button" onClick={closeModal}>
              이만 끝내기
            </button>
            <button className="submit-button" onClick={onContinue}>
              계속하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
