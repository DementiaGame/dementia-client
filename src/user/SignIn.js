// src/user/SignIn.js
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import "./SignIn.css";

const SignIn = () => {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState); // Recoil 상태 설정 함수

  const handleSignIn = async (event) => {
    event.preventDefault();

    const signinForm = {
      nickName,
      password,
    };

    console.log("nickname, password", signinForm);

    try {
      const response = await axios.post(
        "http://localhost:8080/users/signin",
        signinForm
      );
      console.log("Login success:", response.data);

      // Recoil 상태 업데이트
      setUserState((prevState) => {
        const newState = {
          userIdx: response.data.data.userIdx, // 서버에서 받은 userIdx로 업데이트
          // 다른 사용자 정보도 업데이트 가능
        };
        console.log("Updated Recoil state:", newState);
        return newState;
      });

      navigate("/gamemain");
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <div className="signin-container">
      <header>
        <h2 className="signin-title">로그인</h2>
      </header>
      <body>
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
      </body>
      <footer></footer>
    </div>
  );
};

export default SignIn;
