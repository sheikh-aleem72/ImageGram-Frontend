import { io } from "socket.io-client";

export const createSocketConnection = (token) => {
  if (!token) {
    return null;
  }

  return io(import.meta.env.VITE_SOCKET_BACKEND_URL, {
    auth: {
      token,
      transports: ["websocket"], // Avoids long polling delay
    },
  });
};
