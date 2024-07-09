import React, { useEffect, useState } from "react";
import "./SignupStep.css";
import { useNavigate, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";

const GenderStep = () => {
  const [gender, setGender] = useState("");
  const [FemaleButton, setFemaleButton] = useState(false);
  const [MaleButton, setMaleButton] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = { ...location.state };

  const handleNext = async (event) => {
    event.preventDefault();
    navigate("/signup/nickname-step", {
      state: {
        ...userInfo,
        gender: gender,
      },
    });
  };

  const handleGender = (gender) => {
    setGender(gender);
  };

  const handleGoBack = async (event) => {
    navigate(-1);
  };

  const handleExit = async (event) => {
    navigate("/signin");
  };

  useEffect(() => {
    if (gender !== "") {
      setButtonDisabled(false);
      if (gender === "FEMALE") {
        setFemaleButton(true);
        setMaleButton(false);
      } else if (gender === "MALE") {
        setMaleButton(true);
        setFemaleButton(false);
      }
    } else {
      setButtonDisabled(true);
    }
  }, [gender]);

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
            <b>성별</b>을 선택하세요.
          </h2>
          <div className="btn-group">
            <button
              className={
                FemaleButton ? "selected-female-btn" : "unselected-female-btn"
              }
              onClick={() => handleGender("FEMALE")}
            >
              여성
            </button>
            <button
              className={
                MaleButton ? "selected-male-btn" : "unselected-male-btn"
              }
              onClick={() => handleGender("MALE")}
            >
              남성
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
      <footer></footer>
    </div>
  );
};

export default GenderStep;
