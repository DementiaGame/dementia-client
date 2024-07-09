import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SignupStep.css";
import { useNavigate, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";

const PasswordStep = () => {
  // const { signupForm, setSignupForm } = useContext(SignupContext);
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [secondPasswordError, setSecondPasswordError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isSecondPasswordError, setIsSecondPassowrdError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = { ...location.state };

  const apiUrl = process.env.REACT_APP_API_URL;

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
    return passwordRegex.test(password);
  }

  const validateSecondPassword = (secondPassword) => {
    if (password === secondPassword) {
      return true;
    } else {
      return false;
    }
  }

  const handleNext = async (event) => {
    const signupForm = {
      ...userInfo,
      password: password,
      secondPassword: secondPassword,
    }
    console.log("signupForm: ", signupForm);

    axios.post(`${apiUrl}/users/signup`, signupForm)
    //axios.post("http://13.209.160.116:8080/users/signup", signupForm)
      .then((response) => {
        console.log("signup success: ", response);
        navigate("/signup/complete-signup", {
          state: {
            nickName: userInfo.nickName
          }
        });
      })
      .catch((error) => {
        console.log("signup failed: ", error);
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
    } else {
      setIsPasswordError(true);
      setPasswordError("비밀번호는 8~16자리면서 알파벳, 숫자, 특수문자를 포함해야 합니다.");
      setButtonDisabled(true);
    }

    if (secondPassword !== "" && validateSecondPassword(secondPassword)) {
      setIsSecondPassowrdError(false);
      setSecondPasswordError("");
    } else {
      setIsSecondPassowrdError(true);
      setSecondPasswordError("재확인 비밀번호가 일치하지 않습니다.");
      setButtonDisabled(true);
    }

    if (password !== "" && secondPassword !== "" && !isPasswordError && !isSecondPasswordError) {
      setButtonDisabled(false);
    }
  }, [password, secondPassword, isPasswordError, isSecondPasswordError, setPasswordError, setSecondPasswordError, validateSecondPassword]);  
  
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
              <div className="error-message">
                {<div style={{ color: 'red' }}>{passwordError}</div>}
              </div>
              <input
                type="text"
                placeholder="비밀번호 재확인"
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
              ></input>
              <div className="error-message">
                {<div style={{ color: 'red' }}>{secondPasswordError}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="signup-footer">
          <button className="signup-back-bnt" onClick={handleGoBack}>
            이전
          </button>
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
