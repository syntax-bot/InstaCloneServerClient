import express from "express";
import {
  getAllUsers,
  updateUserStory,
  getUser,
  deleteUser,
  getUserStories,
  getUsersBySearch,
  updateRecentSearchAdd,
  updateRecentSearchRemove,
  updateBio,
  updateAvatar
} from "../controller/users.js";

export const usersRouter = express.Router();

usersRouter
  .get("/", getAllUsers)
  .get("/stories", getUserStories)
  .get("/:id", getUser)
  .get("/searchUsers/:value", getUsersBySearch)
  .patch("/addStory/:id", updateUserStory)
  .patch("/RecentSearchAdd/:id", updateRecentSearchAdd)
  .patch("/RecentSearchRemove/:id", updateRecentSearchRemove)
  .patch("/updateBio/:id", updateBio)
  .patch("/updateAvatar/:id", updateAvatar)
  .delete("/:id", deleteUser);
