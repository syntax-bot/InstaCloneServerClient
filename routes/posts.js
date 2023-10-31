import express from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  updatePostAddComment,
  updatePostLike,
  deletePost,
  updatePostCaption,
} from "../controller/posts.js";

export const postsRouter = express.Router();

import multer from "multer";
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "image.jpg");
    },
  }),
});

postsRouter
  .post("/", upload.single("image"), createPost)
  .get("/", getAllPosts)
  .get("/:id", getPost)
  .patch("/addComment/:id", updatePostAddComment)
  .patch("/like/:id", updatePostLike)
  .patch("/caption/:id", updatePostCaption)
  .delete("/:id", deletePost);
