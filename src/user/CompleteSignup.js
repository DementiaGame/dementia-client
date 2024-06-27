import React, { useEffect, useState } from "react";
import "./SignupStep.css"
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const CompleteSignUp = () => {
  const [nickName, setNickname] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const handleNext = async (event) => {
    event.preventDefault();
    navigate.push("/nickName");
  };

  const handleExit = async (event) => {
    navigate('/signin')
  }

  return (
    <div className="signup-container">
      <header className="signup-header">
        <button className="close-btn">
          <MdClose size={24} onClick={handleExit}/>
        </button>
      </header>
      <body>
        <div>
        <FaCheckCircle color="#ff6600"/>
          <h2 className="signup-title">
            가입 완료
          </h2>
            <div>

            </div>
        </div>
        <div className="signup-footer">
          <button className={buttonDisabled ? "disabled-signup-next-bnt" : "enabled-signup-next-bnt"} onClick={handleNext} disabled={buttonDisabled}>다음</button>
        </div>
      </body>
      <footer></footer>
    </div>
  );
};

export default CompleteSignUp;
