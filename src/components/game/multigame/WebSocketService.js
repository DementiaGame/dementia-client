import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
  constructor() {
    this.stompClient = null;
  }

  connect(onConnected, onError) {
    const socket = new SockJS("http://localhost:8080/ws");
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
    });
    this.stompClient.onConnect = onConnected;
    this.stompClient.onStompError = onError;
    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.deactivate();
    }
  }

  sendMessage(destination, message) {
    if (this.stompClient !== null && this.stompClient.connected) {
      this.stompClient.publish({
        destination: destination,
        body: JSON.stringify(message),
      });
    }
  }

  subscribe(topic, callback) {
    if (this.stompClient !== null && this.stompClient.connected) {
      return this.stompClient.subscribe(topic, (message) => {
        callback(JSON.parse(message.body));
      });
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
