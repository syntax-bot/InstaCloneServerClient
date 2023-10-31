import express from "express";
import mongoose from "mongoose";
import { readFileSync } from "node:fs";
import "dotenv/config";
import { authRouter } from "./routes/auth.js";
import { postsRouter } from "./routes/posts.js";
import { usersRouter } from "./routes/users.js";
import path from "node:path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicKey = readFileSync(
  path.resolve(__dirname, "./jwtRS256.key.pub"),
  "utf-8"
);
import cors from "cors";
import Jwt from "jsonwebtoken";

await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connection Successful");
  })
  .catch(() => {
    console.log("connection UnSuccessful");
  });

const auth = (req, res, next) => {
  const header = req.get("Authorization");
  let token;
  if (header) {
    token = header.split("Bearer ")[1]; //loooking carefully ,u have to include a space after Bearer
  } else {
    res.sendStatus(401).json({ error: "NO Token" });
  }
  try {
    const decoded = Jwt.verify(token, publicKey);
    next();
  } catch (err) {
    res.json({ data: "invalid token" });
  }
};

const server = express();

server.use(express.json());
server.use(express.urlencoded());
server.use(cors());
server.use(express.static(path.resolve(__dirname, "dist")));
server.use("/auth", authRouter);
server.use("/usersData", auth, usersRouter);
server.use("/postsData", auth, postsRouter);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

server.listen(8080, () => {
  console.log("server Started");
});
