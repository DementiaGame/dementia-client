import React, { useEffect, useState } from "react";
import "./SignupStep.css";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

const PasswordStep = () => {
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleNext = async (event) => {
    event.preventDefault();
    navigate.push("signup/complete-signup");
  };

  const handleGoBack = async (event) => {
    navigate(-1);
  };

  const handleExit = async (event) => {
    navigate("/signin");
  };

  useEffect(() => {
    if (password !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password]);

  return (
    <div className="signup-container">
      <header className="signup-header">
        <button className="close-btn">
          <MdClose size={24} onClick={handleExit} />
        </button>
      </header>
      <body>
        <div>
          <h2 className="signup-title">
            <b>비밀번호</b>를 입력해주세요.
          </h2>
          <div className="signup-form-group">
            <div className="input-group">
              <input
                type="text"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <input
                type="text"
                placeholder="비밀번호 재확인"
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
              ></input>
              <div className="error-message">
                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="signup-footer">
          <butto className="signup-back-bnt" onClick={handleGoBack}>
            이전
          </butto>
          <button
            className={
              buttonDisabled
                ? "disabled-signup-next-bnt"
                : "enabled-signup-next-bnt"
            }
            onClick={handleNext}
            disabled={buttonDisabled}
          >
            다음
          </button>
        </div>
      </body>
      <footer></footer>
    </div>
  );
};

export default PasswordStep;
