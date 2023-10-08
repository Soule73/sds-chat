import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  createCommentSocket,
  getAllCommentSocket,
  getFindCommentSocket,
} from "./controllers/commentController.js";
import {
  createLikeSocket,
  getAllLikeTypeSocket,
} from "./controllers/likeController.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);

connectDB();

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
  addTrailingSlash: false,
  transports: ["websocket"],
  path: "/api/socket",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

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

  socket.on("getAllComments", async () => {
    io.emit("allComments", await getAllCommentSocket());
  });
  socket.on("getLikeType", async () => {
    io.emit("likeType", await getAllLikeTypeSocket());
  });
  socket.on("getFindComment", async ({ id }) => {
    io.emit("findComment", await getFindCommentSocket(id));
  });
  socket.on("createComment", async ({ parent_id, user_id, content }) => {
    await createCommentSocket(parent_id, user_id, content);
    io.emit("commentSucces", "succes");
  });
  socket.on("createLikeComment", async ({ ref_id, like_id, user_id }) => {
    await createLikeSocket(ref_id, like_id, user_id);
    io.emit("likeComment", "succes");
  });

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

httpServer.listen(port, () => console.log(`Server started on port ${port}`));
