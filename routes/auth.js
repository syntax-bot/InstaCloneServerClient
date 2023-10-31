import express from "express";
import { createUser, checkUser } from "../controller/auth.js";

import multer from "multer";
const upload = multer();

export const authRouter = express.Router();

authRouter.post("/signUp", upload.none(), createUser);
authRouter.post("/signIn", upload.none(), checkUser);
