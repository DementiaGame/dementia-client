import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SignupStep.css";
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
    <div className="signup-container">
      <header className="signup-header">
        <button className="close-btn">
          <MdClose size={24} onClick={handleExit} />
        </button>
      </header>
      <body>
        <div>
          <div className="signup-complete-icon">
            <FaCheckCircle size={110} color="#ff6600" />
          </div>
          <div className="signup-complete-message">가입 완료</div>
          <div className="welcome-message">
            {userInfo.nickName}님, 반가워요!
          </div>
        </div>
        <div className="signup-footer">
          <button className="next-bnt" onClick={handleNext}>
            다음
          </button>
        </div>
      </body>
      <footer></footer>
    </div>
  );
};

export default CompleteSignUp;
