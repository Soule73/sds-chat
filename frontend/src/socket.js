import { io } from "socket.io-client";

export const socket = io("https://sds-social.vercel.app/", {
  withCredentials: true,
});
