import React, { useEffect, useState } from "react";
import "./SignupStep.css"
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

const GenderStep = () => {
  const [gender, setGender] = useState("");
  const [FemaleButton, setFemaleButton] = useState(false);
  const [MaleButton, setMaleButton] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const handleNext = async (event) => {
    event.preventDefault();
    navigate("/signup/nickname-step");
  };

  const handleGender = (gender) => {
    setGender(gender);
  }

  const handleGoBack = async (event) => {
    navigate(-1)
  }

  const handleExit = async (event) => {
    navigate('/signin')
  }

  useEffect(() => {
    if (gender !== "") {
      setButtonDisabled(false);
      if (gender === "FEMALE") {
        setFemaleButton(true);
        setMaleButton(false);
      } else if (gender === "MALE"){
        setMaleButton(true);
        setFemaleButton(false);
      }
    } else {
      setButtonDisabled(true);
    }
  }, [gender])

  return (
    <div className="signup-container">
      <header className="signup-header">
        <button className="close-btn">
          <MdClose size={24} onClick={handleExit}/>
        </button>
      </header>
      <body>
        <div>
          <h2 className="signup-title">
            <b>성별</b>을 선택하세요.
          </h2>
            <div className="btn-group">
              <button className={FemaleButton ? "selected-female-bnt" : "unselected-female-bnt"} onClick={() => handleGender("FEMALE")}>여성</button>
              <button className={MaleButton ? "selected-male-bnt" : "unselected-male-bnt"} onClick={() => handleGender("MALE")}>남성</button>
            </div>
        </div>
        <div className="signup-footer">
          <button className="signup-back-bnt" onClick={handleGoBack}>이전</button>
          <button className={buttonDisabled ? "disabled-signup-next-bnt" : "enabled-signup-next-bnt"} onClick={handleNext} disabled={buttonDisabled}>다음</button>
        </div>
      </body>
      <footer></footer>
    </div>
  );
};

export default GenderStep;
