import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { VscArrowLeft } from "react-icons/vsc";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import "./EditInfo.css";

const EditInfo = () => {
  const [recoilUserState, setRecoilUserState] = useRecoilState(userState);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL; // api 주소

  const [nickName, setNickName] = useState(recoilUserState.nickName);
  const [password, setPassword] = useState("");
  // const [secondPassword, setSecondPassword] = useState("");
  const [birthYear, setBirthYear] = useState(recoilUserState.birthYear);
  const [gender, setGender] = useState(recoilUserState.gender);
  const [faceData, setFaceData] = useState(recoilUserState.faceData);
  const [profileImage, setProfileImage] = useState(
    recoilUserState.profileImage
  );
  const [FemaleButton, setFemaleButton] = useState(gender === "FEMALE");
  const [MaleButton, setMaleButton] = useState(gender === "MALE");

  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditResultModal, setShowEditResultModal] = useState(false);
  const [editResultMessage, setEditResultMessage] = useState("정보를 저장 중입니다.");

  // 정보 수정 버튼 핸들러
  const handleEditInfo = async () => {
    try {
      const updateForm = {
        nickName: nickName,
        password: password,
        birthYear: birthYear,
        gender: gender,
        faceData: faceData,
        profileImage: profileImage,
      };

      const response = await axios.put(`${apiUrl}/users`, updateForm, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("EDITINFO SUCCESS: ", response.data);
        const userData = response.data;

        // Recoil 상태 업데이트
        setRecoilUserState((prevState) => ({
          ...prevState,
          userIdx: userData.data.userIdx,
          nickName: userData.data.nickName,
          birthYear: Number(userData.birthYear),
          gender: userData.data.gender,
          faceData: userData.data.faceData,
          profileImage: userData.data.profileImage,
          role: userData.data.role,
        }));

        setEditResultMessage("정보가 성공적으로 수정되었습니다.");
        closeEditModal();
        openEditResultModal();
      }
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setEditResultMessage("잘못된 요청입니다.");
            break;
          case 401:
            setEditResultMessage("사용자 인증이 필요합니다.");
            navigate("/signin");
            break;
          case 404:
            setEditResultMessage("잘못된 API URL입니다.");
            break;
          case 409:
            setEditResultMessage("중복된 닉네임입니다.");
            break;
          case 500:
            setEditResultMessage("서버 에러가 발생했습니다.");
            break;
          default:
            setEditResultMessage("알 수 없는 에러가 발생했습니다.");
        }
      } else {
        setEditResultMessage("네트워크 에러가 발생했습니다.");
      }
      openEditResultModal();
    }
  };

  // 연도가 변경될 때 호출되는 핸들러
  const handleBirthYearChange = (event) => {
    setBirthYear(parseInt(event.target.value)); // 선택된 연도를 상태에 업데이트
  };

  const handleGender = (gender) => {
    setGender(gender);
    if (gender === "FEMALE") {
      setFemaleButton(true);
      setMaleButton(false);
    } else if (gender === "MALE") {
      setMaleButton(true);
      setFemaleButton(false);
    }
  };

  const handleGoBack = async (event) => {
    navigate(-1);
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const openEditResultModal = () => {
    setShowEditResultModal(true);
  };

  const closeEditResultModal = () => {
    setShowEditResultModal(false);
  };

  useEffect(() => {
    console.log("CURRENT RECOIL STATE: ", recoilUserState);
  }, [recoilUserState]);


  return (
    <div className="edit">
      <header className="header">
        <VscArrowLeft className="header-icon" onClick={handleGoBack} />
      </header>
      <div className="header-placeholder"></div>{" "}
      {/* 헤더 공간 확보를 위한 빈 div */}
      <main className="main">
        <div className="edit-form-group">
          {/* 유저 프로필 구간 */}
          <div className="edit-profile-group">
            <div className="edit-user-info-group">
              <div className="edit-user-info">
                <div className="edit-profile-image">
                  {profileImage === null ? (
                    <div className="avatar"></div>
                  ) : (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="profile-image"
                    />
                  )}
                </div>
                <div className="edit-user-info-name">{recoilUserState.nickName}</div>
              </div>
            </div>
          </div>
          {/* 설정 구간 */}
          <div>&nbsp;</div>
          <div className="setting-group">
            <div className="nickName-edit-group">
              <div className="section-title">닉네임</div>
              <div className="nickName-input">
                <input
                  type="text"
                  placeholder={nickName}
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                  required
                ></input>
              </div>
            </div>
            <div className="birthYear-edit-group">
              <div className="section-title">출생연도</div>
              <div className="date-picker-container">
                <select
                  className="year-dropdown"
                  value={birthYear}
                  onChange={handleBirthYearChange}
                >
                  {/* 연도 옵션 생성 (2000년부터 현재년도까지) */}
                  {Array.from(
                    { length: new Date().getFullYear() - 1900 + 1 },
                    (_, index) => (
                      <option key={1900 + index} value={1900 + index}>
                        {1900 + index}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="gender-edit-group">
              <div className="section-title">성별</div>
              <div className="edit-btn-group">
                <button
                  className={
                    FemaleButton
                      ? "selected-female-edit-bnt"
                      : "unselected-female-edit-bnt"
                  }
                  onClick={() => handleGender("FEMALE")}
                >
                  여성
                </button>
                <button
                  className={
                    MaleButton
                      ? "selected-male-edit-bnt"
                      : "unselected-male-edit-bnt"
                  }
                  onClick={() => handleGender("MALE")}
                >
                  남성
                </button>
              </div>
            </div>
            <div>&nbsp;</div>
            <div className="edit-btn-group">
              <button className="info-save-btn" onClick={openEditModal}>
                정보 수정
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* 수정된 정보 저장 모달 */}
      {showEditModal && (
        <div className="edit-modal-container">
          <div className="edit-modal-content">
            <p className="edit-modal-message">
              수정한 정보를 저장하시겠습니까?
            </p>
            <div className="check-password-group">
              <div className="input-group">
                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="edit-modal-btns">
              <button className="agree-modal-btn" onClick={handleEditInfo}>
                확인
              </button>
              <button className="disagree-modal-btn" onClick={closeEditModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 수정된 정보 저장 결과 모달 */}
      {showEditResultModal && (
        <div className="edit-modal-container">
          <div className="edit-modal-content">
            <p className="edit-modal-message">{editResultMessage}</p>
            <div className="edit-modal-btns">
              <button
                className="agree-modal-btn"
                onClick={closeEditResultModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditInfo;
