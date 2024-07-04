import React, { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showSigninErrorModal, setShowSigninErrorModal] = useState(false);
  //const [ rememberMe, setRememberMe ] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();

    const signinForm = {
      nickName : nickName,
      password : password,
    }

    console.log("nickname, password", signinForm);

    axios
      .post("http://localhost:8080/users/signin", signinForm, { withCredentials: true })
      .then((response) => {
        console.log("Login success: " + response.data);
        navigate('/')
      })
      .catch((error) => {
        console.log("Login failed: " + error);
        setShowSigninErrorModal(true);
      });
  };

  const closeSigninErrorModal= () => {
    setShowSigninErrorModal(false);
  }

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
                type="text"
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
              <button type="button" className="signin-btn" onClick={handleSignIn}>
                로그인
              </button>
            </div>
          </div>
        </form>
      </main>
      {showSigninErrorModal && (
        <div className="modal-container">
          <div className="modal-content">
            <p className="modal-message">로그인에 실패했습니다.</p>
            <div className="modal-btns">
              <button className="agree-modal-btn" onClick={closeSigninErrorModal}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
