import { io } from "socket.io-client";

let socket;
try {
  socket = io(undefined, {
    withCredentials: true,
    transports: ["websocket"], // Required when using Vite
  });
} catch (error) {
  console.error("socket error");
}

export default socket;
