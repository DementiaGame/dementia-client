// src/recoil/userState.js
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// 새로고침 시에도 상태를 유지하기 위해 로컬 스토리지에 저장
const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage, // 저장위치
});

export const userState = atom({
  key: "userState",
  default: {
    userIdx: null,
    // 추가적인 상태를 여기에 정의할 수 있습니다.
    nickName: "",
    birthYear: 0,
    gender: "",
    faceData: "",
    profileImage: "",
    role: "",
    effects: true,
    faceAuth: false,
  },
  effects_UNSTABLE: [persistAtom],
});
