import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CompleteSignUp.css";
import { useNavigate, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const CompleteSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = { ...location.state };

  const handleNext = async (event) => {
    event.preventDefault();
    navigate("/");
  };

  const handleExit = async (event) => {
    navigate("/");
  };

  return (
    <div className="signup-container-4">
      <header className="signup-header-4">
        <button className="close-btn-4">
          <MdClose size={24} onClick={handleExit} />
        </button>
      </header>
      <main>
        <div>
          <div className="signup-complete-icon-4">
            <FaCheckCircle size={110} color="#ff6600" />
          </div>
          <div className="signup-complete-message-4">가입 완료</div>
          <div className="welcome-message-4">
            {userInfo.nickName}님, 반가워요!
          </div>
        </div>
        <div className="signup-footer-4">
          <button className="next-btn-4" onClick={handleNext}>
            다음
          </button>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default CompleteSignUp;
