import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { User } from "../model/User.js";

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../jwtRS256.key"),
  "utf-8"
);

export const createUser = (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const token = Jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  const newUser = new User({ ...req.body, password: hash, token: token });
  newUser
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      if (err.name === "MongoServerError" && err.code === 11000) {
        res.status(409).json(err.keyPattern);
      } else {
        res.status(409).json(err);
      }
    });
};

export const checkUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((doc) => {
      if (doc) {
        const isAuth = bcrypt.compareSync(req.body.password, doc.password);
        if (isAuth) {
          const token = Jwt.sign({ email: req.body.email }, privateKey, {
            algorithm: "RS256",
          });
          doc.token = token;
          doc.save().then((doc) => {
            res.json(doc);
          });
        } else {
          res.status(401).json({ msg: "Wrong Password" });
        }
      } else {
        res.status(404).json({ msg: "User Not Found" });
      }
    })
    .catch((err) => {
      res.status(401).json({ msg: "an error has occured" });
    });
};
