import express from "express";
import { getAllLikeType } from "../controllers/likeController.js";
import { protect } from "../middleware/authMiddleware.js";

const likeRoutes = express.Router();

likeRoutes.route("/likeType").post(protect, getAllLikeType);

export default likeRoutes;
