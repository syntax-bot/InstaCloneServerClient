import { Post, Types } from "../model/Post.js";
import fs from "node:fs";
import { v2 as cloudinary } from "cloudinary";
import { User } from "../model/User.js";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// export const createPost = (req, res) => {
//   console.log("*", req);
//   cloudinary.uploader
//     .upload(req.file.path, {
//       public_id: `${req.body.userId}${Date.now()}`,
//       folder: "postsImage",
//     })
//     .then((result) => {
//       fs.unlinkSync(req.file.path);
//       const newPost = new Post({
//         image: result.url,
//         userId: req.body.userId,
//         caption: req.body.caption,
//         title: req.body.title,
//         time: new Date(),
//       });
//       return newPost.save();
//     })
//     .then((doc) => {
//       if (doc && doc._id) {
//         User.findOneAndUpdate(
//           { _id: new Types.ObjectId(req.body.userId) },
//           { $push: { posts: doc._id } }
//         )
//           .then((doc) => {})
//           .catch((err) => {});
//       }
//       res.status(201).json(doc);
//     })
//     .catch((err) => {
//       res.status(401).json(err);
//     });
// };

export const createPost= (req, res) => {
  console.log(req.body);
  const newPost = new Post({
    image: req.body.image,
    userId: req.body.userId,
    caption: req.body.caption,
    title: req.body.title,
    time: new Date(),
  });
  newPost
    .save()
    .then((doc) => {
      if (doc && doc._id) {
        User.findOneAndUpdate(
          { _id: new Types.ObjectId(req.body.userId) },
          { $push: { posts: doc._id } }
        )
          .then((doc) => {})
          .catch((err) => {});
      }
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(err);
    });
};

export const getAllPosts = (req, res) => {
  Post.find()
    .sort({ _id: -1 })
    .skip(req.query.skip * req.query.limit)
    .limit(req.query.limit)
    .exec()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.json(err);
    });
};

export const getPost = (req, res) => {
  Post.findById(new Types.ObjectId(req.params.id))
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.json({ title: err });
    });
};

export const updatePostAddComment = (req, res) => {
  Post.findOneAndUpdate(
    { _id: new Types.ObjectId(req.params.id) },
    { $push: { comments: req.body } },
    { new: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};

export const updatePostCaption = (req, res) => {
  Post.findOneAndUpdate(
    { _id: new Types.ObjectId(req.params.id) },
    { caption: req.body.caption },
    { new: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};
export const updatePostLike = (req, res) => {
  Post.findOne({
    $and: [
      { _id: new Types.ObjectId(req.params.id) },
      { "likes.userName": req.body.userName },
    ],
  })
    .then((doc) => {
      if (doc) {
        //like remove karna chate  h
        Post.findOneAndUpdate(
          { _id: new Types.ObjectId(req.params.id) },
          { $pull: { likes: req.body } },
          { new: true }
        )
          .then((doc) => {
            res.json(doc);
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        //like karna chate h
        Post.findOneAndUpdate(
          { _id: new Types.ObjectId(req.params.id) },
          { $push: { likes: req.body } },
          { new: true }
        )
          .then((doc) => {
            res.json(doc);
          })
          .catch((err) => {
            res.json(err);
          });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

export const deletePost = (req, res) => {
  Post.findOneAndDelete({ _id: new Types.ObjectId(req.params.id) })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};
