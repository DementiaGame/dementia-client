import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NickNameStep.css";
import { useNavigate, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";

const NickNameStep = () => {
  const [nickName, setNickName] = useState("");
  const [invalidMessage, setInvalidMessage] = useState("");
  const [duplicateMessage, setDuplicateMessage] = useState("");
  const [nickNameDuplicateError, setNickNameDuplicateError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = { ...location.state };

  const handleDuplicateNickname = async (event) => {
    try {
      const params = { nickName: nickName };
      axios
        .get("http://13.209.160.116:8080/users/existnickname", { params })
        .then((response) => {
          console.log("check duplicate nickname: " + response.data.data);

          if (response.data.data) {
            setDuplicateMessage("중복되는 닉네임입니다.");
            setNickNameDuplicateError(true);
          } else {
            setDuplicateMessage("사용가능한 닉네임입니다.");
            setNickNameDuplicateError(false);
            setButtonDisabled(false);
          }
        });
    } catch (error) {
      console.log("duplicate nickname" + error);
      setDuplicateMessage("중복 닉네임 확인 오류입니다.");
    }
  };

  const validateNickName = (nick) => {
    const nickRegex = /^(?![ㄱ-ㅎ])[a-zA-Z0-9가-힣]{2,12}$/;
    return nickRegex.test(nick);
  };

  const handleNext = (event) => {
    navigate("/signup/password-step", {
      state: {
        ...userInfo,
        nickName: nickName,
      },
    });
  };

  const handleGoBack = async (event) => {
    navigate(-1);
  };

  const handleExit = async (event) => {
    navigate("/signin");
  };

  const handleVoiceInput = () => {
    // 음성인식 기능 구현
    console.log("음성인식 기능 호출");
  };

  useEffect(() => {
    if (nickName !== "" && validateNickName(nickName)) {
      setInvalidMessage("");
    } else {
      setInvalidMessage(
        "닉네임은 2~12자리면서 초성이 아닌 한글, 영어, 숫자로 구성되어야 합니다."
      );
    }
  }, [nickName]);

  useEffect(() => {
    if (nickName !== "" && !nickNameDuplicateError) {
      setDuplicateMessage("");
    } else {
      setButtonDisabled(true);
    }
  }, [nickName, nickNameDuplicateError]);

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
            게임에서 사용할 <b>별명</b>을 알려주세요.
          </h2>
          <div className="signup-form-group">
            <div className="input1-group">
              <input
                type="text"
                placeholder="별명 입력"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
              <div className="error-message">
                {invalidMessage && (
                  <div style={{ color: "red" }}>{invalidMessage}</div>
                )}
              </div>
              <div className="error-message">
                {duplicateMessage && (
                  <div style={{ color: "red" }}>{duplicateMessage}</div>
                )}
              </div>
              <button
                className="nickname-check-btn"
                onClick={handleDuplicateNickname}
              >
                중복 확인
              </button>
              <button className="voice-input1-btn" onClick={handleVoiceInput}>
                <FaMicrophone /> 음성으로도 입력할 수 있어요!
              </button>
            </div>
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

export default NickNameStep;
