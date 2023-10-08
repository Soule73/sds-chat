import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
// const URL = import.meta.env.VITE_NODE_ENV || undefined;
const URL = "https://sds-social.vercel.app/";

export const socket = io(URL, {
  withCredentials: true,
  transports: ["websocket"], // Required when using Vite
  path: "/api/socket",
});
