import mongoose from "mongoose";
export const { Schema, model, Types } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: {
    type: String,
    unique: [true, "User With this Email Already Exist"],
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, "User Required"],
  },

  userName: { type: String, unique: true, required: true },
  password: { type: String, minLength: 6, required: true },
  token: { type: String },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dkwgfluqp/image/upload/v1698388649/avatar/defaultAvatar.webp",
  },
  story: { type: String, default: null },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  friends: [{ type: String }],
  bio: {
    type: String,
    default: "Write something about you./nSo,people can get to know you.",
  },
  RecentSearch: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const User = model("User", userSchema);
