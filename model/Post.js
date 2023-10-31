import mongoose from "mongoose";
export const { Schema, model, Types } = mongoose;
const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, default: "" },
  time: { type: String, default: new Date() },
  likes: [{ type: Object }],
  comments: [{ type: Object }],
  image: { type: String, required: true },
  caption: { type: String },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dkwgfluqp/image/upload/v1698388649/avatar/defaultAvatar.webp",
  },
});

export const Post = model("Post", postSchema);
