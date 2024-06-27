import React, { useEffect, useState } from "react";
import "./SignupStep.css";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

const BirthyearStep = () => {
  const [birthyear, setBirthyear] = useState("");
  const [birthyearError, setBirthyearError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (birthyear.length === 4) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [birthyear])

  const validateBirthyear = (year) => {
    const yearRegex = /^(19[0-9]{2}|20[0-9]{2}|2100)$/;
    return yearRegex.test(year);
  };

  const handleButtonClick = (num) => {
    if (birthyear.length < 4) {
      setBirthyear(birthyear + num);
    }
  };

  const handleDelete = () => {
    setBirthyear(birthyear.slice(0, -1));
  };

  const handleClear = () => {
    setBirthyear("");
  };

  const handleNext = async (event) => {
    if (birthyear.length === 4 && validateBirthyear(birthyear)) {
      navigate("/signup/gender-step");
    } else {
      setBirthyearError("태어난 해를 다시 눌러주세요.");
    }
  };

  const handleGoBack = async (event) => {
    navigate(-1)
  }

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
          <h2 className="signup-title">
            <b>태어난 해</b>를 눌러주세요.
          </h2>
          <div className="signup-form-group">
            <div className="input-group">
              <div className="birthyear-display">
                <div>
                  {birthyear}
                </div>
                </div>
              <div className="error-message">
                {birthyearError && <div style={{ color: 'red' }}>{birthyearError}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="number-pad">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "전체삭제", "0", "지우기",].map((num, index) => (
            <button
              key={index}
              onClick={() => {
                if (num === "전체삭제") {
                  handleClear();
                } else if (num === "지우기") {
                  handleDelete();
                } else {
                  handleButtonClick(num);
                }
              }}
            >
              {num}
            </button>
          ))}
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

export default BirthyearStep;
