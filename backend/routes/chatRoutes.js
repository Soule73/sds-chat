import express from "express";
import {
  createNewChat,
  getAllMessage,
  getAllUserChats,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const chatRoutes = express.Router();

chatRoutes
  .route("/userChats")
  .get(protect, getAllMessage)
  .post(protect, getAllUserChats);
chatRoutes
  .route("/newChat")

  .post(protect, createNewChat);

export default chatRoutes;
