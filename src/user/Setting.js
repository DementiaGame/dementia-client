import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaCog, FaUserCircle } from "react-icons/fa";
import { MdChevronRight } from 'react-icons/md';
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import "./Setting.css"

const Setting = () => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [user, setUser] = useState(null);
  const [effects, setEffects] = useState(true); // 효과음 설정
  const [notifications, setNotifications] = useState(false); // 알림 설정
  const [faceAuth, setFaceAuth] = useState(false); // 생체 인증 설정
  const [faceData, setFaceData] = useState(""); // 얼굴 인식 데이터
  const [nickName, setNickName] = useState("");
  const [birthYear, setBirthYear] = useState(0);
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAccountDeletionModal, setShowAccountDeletionModal] = useState(false);
  const [fetchTimeout, setFetchTimeout] = useState(false);

  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState); // Recoil 상태 설정 함수

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleToggle = (option) => {
    if (option === 'effects') {
      setEffects(!effects);
    } else if (option === 'notifications') {
      setNotifications(!notifications);
    } else if (option === 'faceAuth') {
      setFaceAuth(!faceAuth);
      // todo: 토글 활성화 시, facedata가 설정돼있지 않다면 facedata를 저장하는 모달 생성 -> 사용자 faceData에 담아 서버로 post
      //handleFaceAuth(); 
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 랜덤 색상 생성 함수
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const avatarStyle = {
    backgroundColor: getRandomColor(), // 랜덤 색상 생성 함수 호출
  };

  const handleSignout = () => {
    axios.post(`${apiUrl}/users/signout`, {}, { withCredentials: true })
      .then((response) => {
        console.log('Signout successful:', response.data);
        navigate('/signin'); 
      })
      .catch((error) => {
        console.error('Signout error:', error);
      });
  };

  const handleFaceAuth = () => {
    const updateData = {
      ...user,
      faceData: faceData,
    };

    axios.post(`${apiUrl}/users`, { updateData }, { withCredentials: true })
      .then((response) => {
        console.log('faceAuth setting success:', response.data);
      })
      .catch((error) => {
        console.error('faceAuth setting fail:', error);
      });
  }

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const openAccountDeletionModal = () => {
    setShowAccountDeletionModal(true);
  }

  const closeAccountDeletionModal = () => {
    setShowAccountDeletionModal(false);
  };

  // 계정 탈퇴 동작을 수행하는 함수
  const handleAccountDeletion = () => {
    axios.delete(`${apiUrl}/users`, { withCredentials: true })
      .then((response) => {
        console.log('account deletion successful:', response.data);
        navigate('/signin'); // Navigate to login page after logout
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });

    setShowAccountDeletionModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`, { withCredentials: true });

        const userData = response.data;

        setUser(userData);
        setNickName(userData.data.nickName);
        setBirthYear(Number(userData.data.birthYear));
        setGender(userData.data.gender === 'MALE' ? '남성' : '여성');
        setFaceAuth(userData.data.faceData !== null);
        setProfileImage(userData.data.profileImage);
        setIsLoading(false);

            // Recoil 상태 업데이트
        // setUserState({
        //   userIdx,
        //   nickName,
        //   birthyear,
        //   gender,
        //   faceData,
        //   profileImage,
        //   effects,
        //   faceAuth,
        // });

        // Recoil 상태 업데이트
        setUserState({
          userIdx: userData.data.userIdx,
          nickName: userData.data.nickName,
          birthYear: Number(userData.data.birthYear),
          gender: userData.data.gender,
          faceData: userData.data.faceData,
          profileImage: userData.data.profileImage,
          role: userData.data.role,
          effects: effects,
          faceAuth: faceAuth,
        });

      } catch (error) {
        console.log('get user info error:', error);
        setIsLoading(false);
      }
    };

    // 타임아웃 설정: 10초 후에 setIsLoading(false)가 호출되지 않으면 fetchTimeout을 true로 설정
    const timeoutId = setTimeout(() => {
      setFetchTimeout(true);
    }, 10000); // 10초

    fetchData();

    // cleanup 함수에서 타임아웃 제거
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // fetchTimeout이 true일 때 처리하는 로직
    if (fetchTimeout && isLoading) {
      setIsLoading(false); // 로딩 상태 해제
      return <div>Error: Failed to load user data.</div>; // 데이터 로드 실패 
    }
  }, [fetchTimeout, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // 데이터 로딩 중에는 로딩 표시
  }

  if (!user) {
    return <div>Error: Failed to load user data.</div>; // 데이터 로드 실패
  }

  return (
      <div className="setting">
        <header className="header">
          <FaUserCircle className="header-icon" />
          <FaCog className="header-icon" />
        </header>
        <div className="header-placeholder"></div>{" "}
        {/* 헤더 공간 확보를 위한 빈 div */}
        <main className="main">
          <div className="setting-form-group">
            {/* 유저 프로필 구간 */}
            <div className="profile-group">
              <div className="user-info-group">
                <div className="user-info">
                  <div className="user-info-name">{nickName}</div>
                  <div className="place-hoder">&nbsp;</div>
                  <div className="user-info-detail">{birthYear}년생, {gender}</div>
                </div>
                <div className="profile-image">
                  { profileImage === null ? 
                  <div className="avatar" style={avatarStyle}>
                  <span className="initial">{nickName.substring(0, 1).toUpperCase()}</span>
                  </div> : 
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-image"
                  />}
                </div>
              </div>
              <div className="break-line">
                <hr/>
              </div>
              <button className="edit-info-btn">
                <Link className="link-style" to="/user/setting/edit">내 정보 수정하기</Link>
                </button>
            </div>
            {/* 설정 구간 */}
            <div className="setting-group">
              <div className="collection-info-group">
                <div className="section-title">수집 정보</div>
                <div className="collection-item">
                  🏅 내가 모은 뱃지
                  <MdChevronRight size={24} />
                </div>
                <div className="collection-item">
                  🎁 내가 모은 쿠폰
                  <MdChevronRight size={24} />
                </div>
              </div>
              <div className="game-setting-group">
                <div className="section-title">게임 설정</div>
                <div className="setting-item">
                  효과음 설정
                  <div
                    className={`toggle-button ${effects ? 'active' : ''}`}
                    onClick={(e) => handleToggle('effects')}
                  />
                </div>
                <div className="setting-item">
                  알림 설정
                  <div
                    className={`toggle-button ${notifications ? 'active' : ''}`}
                    onClick={(e) => handleToggle('notifications')}
                  />
                </div>
              </div>
              <div className="account-setting-group">
                <div className="section-title">계정 설정</div>
                <div className="setting-item" onClick={openLogoutModal}>로그아웃</div>
                <div className="setting-item" onClick={openAccountDeletionModal}>계정 탈퇴</div>
                <div className="setting-item">
                  생체 인증
                  <div
                    className={`toggle-button ${faceAuth ? 'active' : ''}`}
                    onClick={(e) => handleToggle('faceauth')}
                  />
                </div>
              </div>
              <div className="terms-of-service-group">
                <div className="section-title">이용정책</div>
                <div className="policy-item">
                  개인정보처리방침
                  <MdChevronRight size={24} />
                </div>
                <div className="policy-item">
                  이용약관
                  <MdChevronRight size={24} />
                </div>
              </div>
            </div>
          </div>
        </main>
        {showLogoutModal && (
          <div className="setting-modal-container">
            <div className="setting-modal-content">
              <p className="setting-modal-message">로그아웃 하시겠습니까?</p>
              <div className="setting-modal-btns">
                <button className="agree-modal-btn" onClick={handleSignout}>확인</button>
                <button className="disagree-modal-btn" onClick={closeLogoutModal}>취소</button>
              </div>
            </div>
          </div>
        )}
        {showAccountDeletionModal && (
          <div className="setting-modal-container">
            <div className="setting-modal-content">
              <p className="setting-modal-message">계정을 탈퇴하시겠습니까?</p>
              <div className="setting-modal-btns">
                <button className="agree-modal-btn" onClick={handleAccountDeletion}>확인</button>
                <button className="disagree-modal-btn" onClick={closeAccountDeletionModal}>취소</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default Setting;