import express from "express";
import {
  createLike,
  createLikeType,
  getAllLikeType,
  // createLikeType
} from "../controllers/likeController.js";
const likeRoutes = express.Router();

// likeRoutes.post("/", getAllComment);

likeRoutes.post("/create", createLike);
likeRoutes.post("/type", createLikeType);
likeRoutes.post("/type/all", getAllLikeType);

// router.patch("/:id", async () => {});

// router.delete("/:id", async () => {});

export default likeRoutes;
