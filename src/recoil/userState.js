// src/recoil/userState.js
import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    userIdx: null,
    // 추가적인 상태를 여기에 정의할 수 있습니다.
    nickName: null,
    birthyear: null,
    gender: null,
    faceData: null,
    profileImage: null,
    role: null,
    effects: true,
    faceAuth: false,
  },
});
