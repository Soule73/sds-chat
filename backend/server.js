import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";

import chatRoutes from "./routes/chatRoutes.js";
import {
  createMessageSocket,
  getAllMessageSocket,
} from "./controllers/messageController.js";
import likeRoutes from "./routes/likeRoutes.js";
import { createLikeSocket } from "./controllers/likeController.js";
// import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);

connectDB();

const io = new Server(httpServer, {
  cors: {
    origin: [process.env.CLIENT_URL, "http://192.168.192.231:3000/"],
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/like", likeRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

// Socket.IO
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on("createLikeComment", async ({ messageId, likeTypeId, userId }) => {
    await createLikeSocket(messageId, likeTypeId, userId);

    const userAllMessage = await getAllMessageSocket(userId);
    io.emit("likeComment", userAllMessage);
  });

  // new socket on SDS CHAT
  socket.on("getUserAllMessage", async ({ userId }) => {
    const userAllMessage = await getAllMessageSocket(userId);
    socket.emit("userAllMessage", userAllMessage);
  });

  socket.on("sendMessage", async ({ parentId, userId, chatId, content }) => {
    await createMessageSocket(parentId, userId, chatId, content);
    const userAllMessage = await getAllMessageSocket(userId);

    io.emit("sendSucces", userAllMessage);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

httpServer.listen(port, () => console.log(`Server started on port ${port}`));
