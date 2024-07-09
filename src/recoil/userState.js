import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    userIdx: null,
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

export const memoryGameState = atom({
  key: "memoryGameState",
  default: {
    userId: null,
    memoryGameIdx: null,
  },
});
