import React, { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();

    const signinForm = {
      nickName: nickName,
      password: password,
    };

    console.log("nickname, password", signinForm);

    axios
      .post("http://localhost:8080/users/signin", signinForm)
      .then((response) => {
        console.log("Login success: " + response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log("Login failed: " + error);
      });
  };

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
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label>로그인 상태 유지</label>
          </div>
          <div className="signup-btn">
            <Link to="/signup/birthyear-step">회원가입</Link>
          </div>
          <div className="signin-footer">
            <div className="input-group">
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
      <footer></footer>
    </div>
  );
};

export default SignIn;
