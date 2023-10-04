import express from "express";
import {
  createComment,
  findComment,
  getAllComment,
} from "../controllers/commentController.js";
const commentRoutes = express.Router();

commentRoutes.post("/", getAllComment);

commentRoutes.post("/create", createComment);
commentRoutes.post("/find/:id", findComment);

// router.patch("/:id", async () => {});

// router.delete("/:id", async () => {});

export default commentRoutes;
