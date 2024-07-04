// src/user/SignIn.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/userState";
import "./SignIn.css";

const SignIn = () => {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showSigninErrorModal, setShowSigninErrorModal] = useState(false);
  const setUserState = useSetRecoilState(userState); // Recoil 상태 설정 함수

  const user = useRecoilValue(userState); // Recoil 상태 가져오기

  const handleSignIn = async (event) => {
    event.preventDefault();

    const signinForm = {
      nickName,
      password,
    };

    console.log("nickname, password", signinForm);

    try {
      const response = await axios.post(
        "http://13.209.160.116:8080/users/signin",
        signinForm,
        { withCredentials: true }
      );
      console.log("Login success:", response.data);

      // Recoil 상태 업데이트
      setUserState((prevState) => {
        const newState = {
          userIdx: response.data.data.userIdx, // 서버에서 받은 userIdx로 업데이트
          // 다른 사용자 정보도 업데이트 가능
          nickName: response.data.data.nickName,
        };
        console.log("Updated Recoil state:", newState);
        return newState;
      });

      navigate("/gamemain");
    } catch (error) {
      console.log("Login failed:", error);
      setShowSigninErrorModal(true);
    }
  };

  const closeSigninErrorModal= () => {
    setShowSigninErrorModal(false);
  }

  useEffect(() => {
    // 로그인 상태를 확인하고 로그인되어 있으면 리디렉션
    if (user && user.userIdx) {
      navigate("/gamemain");
    }
  }, [user, navigate]);

  return (
    <div className="signin-container">
      <header>
        <h2 className="signin-title">로그인</h2>
      </header>
      <main>
        <form onSubmit={handleSignIn}>
          <div className="signin-form-group">
            <div className="input-group">
              <input
                type="text"
                placeholder="닉네임"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                required
              ></input>
              <input
                type="password" // 비밀번호는 type="password"로 변경
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="signin-footer">
            <div className="signin-btn-group">
              <div className="signup-btn">
                <Link to="/signup/birthyear-step">회원가입</Link>
              </div>
              <button type="button" className="faceauth-btn">
                생체 인증
              </button>
              <button type="submit" className="signin-btn">
                로그인
              </button>
            </div>
          </div>
        </form>
      </main>
      {showSigninErrorModal && (
        <div className="signin-modal-container">
          <div className="signin-modal-content">
            <p className="signin-modal-message">로그인에 실패했습니다.</p>
            <div className="signin-modal-btns">
              <button className="agree-modal-btn" onClick={closeSigninErrorModal}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
