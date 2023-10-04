import express from "express";
import {
  createComment,
  findComment,
  getAllComment,
} from "../controllers/commentController.js";
const commentRoutes = express.Router();

commentRoutes.post("/", getAllComment);

commentRoutes.post("/:id", findComment);

commentRoutes.post("/", createComment);

// router.patch("/:id", async () => {});

// router.delete("/:id", async () => {});

export default commentRoutes;
