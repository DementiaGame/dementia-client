import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SignupStep.css";
import { useNavigate,useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";

const NickNameStep = () => {
  const [nickName, setNickName] = useState("");
  const [invalidMessage, setInvalidMessage] = useState(""); 
  const [duplicateMessage, setDuplicateMessage] = useState(""); 
  //const [nickNameInvalidError, setNickNameInvalidError] = useState(false);
  const [nickNameDuplicateError, setNickNameDuplicateError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = { ...location.state };

  const apiUrl = process.env.REACT_APP_API_URL;

  // todo: 1. 닉네임 중복 검사 api 생성 2. next-btn 눌렀을 때 닉네임 중복 검사 후, 유효하면 다음 페이지 로드
  const handleDuplicateNickname = async (event) => {
    try {    
      const params = { nickName: nickName };
      
      axios
      .get(`${apiUrl}/users/existnickname`, { params })
      .then((response) => {
        console.log("check duplicate nickname: " + response.data.data);
        
        if (response.data.data) {
          setDuplicateMessage("중복되는 닉네임입니다.")
          setNickNameDuplicateError(true);
        } else {
          setDuplicateMessage("사용가능한 닉네임입니다.")
          setNickNameDuplicateError(false)
          setButtonDisabled(false);
        }
      });
    } catch (error) {
        console.log("duplicate nickname" + error);
        setDuplicateMessage("중복 닉네임 확인 오류입니다.")
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
      }
    });
  };

  const handleGoBack = async (event) => {
    navigate(-1)
  }

  const handleExit = async (event) => {
    navigate('/signin')
  }

  // 닉네임 유효성 체크
  useEffect(() => {
    if (nickName !== "" && validateNickName(nickName)) {
      setInvalidMessage("");
    } else {
      setInvalidMessage("닉네임은 2~12자리면서 초성이 아닌 한글, 영어, 숫자로 구성되어야 합니다.");
    }
  }, [nickName]);

  // 중복 닉네임 체크
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
        <button className="close-btn">
          <MdClose size={24} onClick={handleExit}/>
        </button>
      </header>
      <main>
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
                {invalidMessage && <div style={{ color: 'red' }}>{invalidMessage}</div>}
              </div>
              <div className="error-message">
                {duplicateMessage && <div style={{ color: 'red' }}>{duplicateMessage}</div>}
              </div>
              <button className="nickname-check-btn" onClick={handleDuplicateNickname}>중복 확인</button>
            </div>
          </div>
        </div>
        <div className="signup-footer">
          <button className="signup-back-bnt" onClick={handleGoBack}>이전</button>
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
      </main>

    </div>
  );
};

export default NickNameStep;
