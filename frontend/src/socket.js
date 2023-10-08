import { io } from "socket.io-client";

export const socket = io(undefined, {
  withCredentials: true,
  transports: ["websocket"], // Required when using Vite
});
