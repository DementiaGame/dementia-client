import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SignupStep.css";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

const NickNameStep = () => {
  const [nickName, setNickName] = useState("");
  const [nickNameInvalidError, setNickNameInvalidError] = useState("");
  const [nickNameDuplicateError, setNickNameDuplicateError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  // todo: 1. 닉네임 중복 검사 api 생성 2. next-btn 눌렀을 때 닉네임 중복 검사 후, 유효하면 다음 페이지 로드
  const handleDuplicateNickname = async (event) => {
    event.preventDefault();

    axios
      .post("/users/validatenickname", { nickName })
      .then((response) => {
        console.log("validate nickname" + response.data);
        
      })
      .catch((error) => {
        console.log("invalidate nickname" + error);
      });
  };

  const validateNickName = (nick) => {
    const nickRegex = /^(?![ㄱ-ㅎ])[a-zA-Z0-9가-힣]{2,12}$/;
    return nickRegex.test(nick);
  };

  useEffect(() => {
    if (nickName !== "" && validateNickName(nickName)) {
      setButtonDisabled(false);
      setNickNameInvalidError("");
    } else {
      setButtonDisabled(true);
      setNickNameInvalidError("닉네임은 2~12자리면서 초성이 아닌 한글, 영어, 숫자로 구성되어야 합니다.");
    }
  }, [nickName, setNickNameInvalidError]);

  const handleNext = async (event) => {
    event.preventDefault();
    navigate("/signup/password-step");
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
            게임에서 사용할 <b>별명</b>을 알려주세요.
          </h2>
          <div className="signup-form-group">
            <div className="input-group">
              <input
                type="text"
                placeholder="별명 입력"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              ></input>
              <div className="error-message">
                {nickNameInvalidError && <div style={{ color: 'red' }}>{nickNameInvalidError}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="signup-footer">
          <butto className="signup-back-bnt" onClick={handleGoBack}>이전</butto>
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

export default NickNameStep;
