import { useEffect } from "react";
import webSocketService from "./WebSocketService";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userState";

const useWebSocket = (roomId, onGameStart, setUsers) => {
  const [user] = useRecoilState(userState);

  useEffect(() => {
    const onConnected = () => {
      console.log("Connected to WebSocket");

      // 방에 참여합니다.
      webSocketService.sendMessage("/app/join", {
        usersIdx: user.userIdx,
        roomIdx: roomId,
        nickName: user.nickName,
      });

      // 방의 업데이트를 구독합니다.
      webSocketService.subscribe(`/topic/room/${roomId}`, (message) => {
        if (message.isStarted) {
          onGameStart();
        } else {
          setUsers(message);
        }
      });
    };

    const onError = (error) => {
      console.error("WebSocket connection error:", error);
    };

    webSocketService.connect(onConnected, onError);

    return () => {
      // 방을 떠나고 연결을 종료합니다.
      webSocketService.sendMessage("/app/leave", {
        roomIdx: roomId,
        usersIdx: user.userIdx,
      });
      webSocketService.disconnect();
    };
  }, [roomId, user, setUsers, onGameStart]);

  return null;
};

export default useWebSocket;
