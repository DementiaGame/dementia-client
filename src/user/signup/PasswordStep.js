import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PasswordStep.css";
import { useNavigate, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";

const PasswordStep = () => {
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [secondPasswordError, setSecondPasswordError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isSecondPasswordError, setIsSecondPasswordError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = { ...location.state };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
    return passwordRegex.test(password);
  };

  const validateSecondPassword = (secondPassword) => {
    return password === secondPassword;
  };

  const handleNext = async (event) => {
    const signupForm = {
      ...userInfo,
      password: password,
      secondPassword: secondPassword,
    };
    axios
      .post("http://13.209.160.116:8080/users/signup", signupForm)
      .then((response) => {
        navigate("/signup/complete-signup", {
          state: {
            nickName: userInfo.nickName,
          },
        });
      })
      .catch((error) => {
        alert("회원가입이 실패했습니다: ", error);
      });
  };

  const handleGoBack = async (event) => {
    navigate(-1);
  };

  const handleExit = async (event) => {
    navigate("/signin");
  };

  useEffect(() => {
    if (password !== "" && validatePassword(password)) {
      setIsPasswordError(false);
      setPasswordError("");
    } else if (password !== "") {
      setIsPasswordError(true);
      setPasswordError(
        "비밀번호는 8~16자리면서 알파벳, 숫자, 특수문자를 포함해야 합니다."
      );
    }

    if (secondPassword !== "" && validateSecondPassword(secondPassword)) {
      setIsSecondPasswordError(false);
      setSecondPasswordError("");
    } else if (secondPassword !== "") {
      setIsSecondPasswordError(true);
      setSecondPasswordError("재확인 비밀번호가 일치하지 않습니다.");
    }

    if (
      password !== "" &&
      secondPassword !== "" &&
      !isPasswordError &&
      !isSecondPasswordError
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password, secondPassword, isPasswordError, isSecondPasswordError]);

  return (
    <div className="signup-container">
      <header className="signup-header">
        <button className="close-btn" onClick={handleExit}>
          <MdClose size={24} />
        </button>
      </header>
      <main>
        <div>
          <h2 className="signup-title">
            <b>비밀번호</b>를 입력해주세요.
          </h2>
          <div className="signup-form-group">
            <div className="input2-group">
              <input
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <div className="error-message" style={{ color: "red" }}>
                  {passwordError}
                </div>
              )}
              <input
                type="password"
                placeholder="비밀번호 재확인"
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
              />
              {secondPasswordError && (
                <div className="error-message" style={{ color: "red" }}>
                  {secondPasswordError}
                </div>
              )}
            </div>
          </div>
          <div className="voice-input-container">
            <div className="voice-input-bubble">
              음성으로도 입력할 수 있어요!
            </div>
            <button className="voice-input-btn">
              <FaMicrophone />
            </button>
          </div>
        </div>
        <div className="signup-footer">
          <button className="signup-back-btn" onClick={handleGoBack}>
            이전
          </button>
          <button
            className={
              buttonDisabled
                ? "disabled-signup-next-btn"
                : "enabled-signup-next-btn"
            }
            onClick={handleNext}
            disabled={buttonDisabled}
          >
            다음
          </button>
        </div>
      </main>
    </div>
  );
};

export default PasswordStep;
