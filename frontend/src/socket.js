import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
// const URL = import.meta.env.VITE_SERVER_URL || undefined;
// const URL = undefined;

export const socket = io(undefined, {
  withCredentials: true,
  transports: ["websocket"], // Required when using Vite
});
