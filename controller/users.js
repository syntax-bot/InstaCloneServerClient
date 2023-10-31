import { User, Types } from "../model/User.js";

export const getAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
};

export const getUserStories = (req, res) => {
  User.find({ story: { $ne: null } })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
};

export const getUser = (req, res) => {
  User.findById(new Types.ObjectId(req.params.id))
    .populate("posts")
    .populate("RecentSearch")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json({ title: err });
    });
};

export const getUsersBySearch = (req, res) => {
  User.find({ userName: new RegExp("^" + req.params.value, "i") })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
};

export const updateUserStory = (req, res) => {
  User.findOneAndUpdate({ _id: new Types.ObjectId(req.params.id) }, req.body, {
    new: true,
  })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};

export const updateRecentSearchAdd = (req, res) => {
  User.findOneAndUpdate(
    { _id: new Types.ObjectId(req.params.id) },
    { $push: { RecentSearch: req.body._id } },
    { new: true }
  )
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};

export const updateRecentSearchRemove = (req, res) => {
  User.findOneAndUpdate(
    { _id: new Types.ObjectId(req.params.id) },
    { $pull: { RecentSearch: req.body._id } },
    { new: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};

export const updateBio = (req, res) => {
  User.findOneAndUpdate(
    { _id: new Types.ObjectId(req.params.id) },
    { bio: req.body.bio },
    { new: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};

export const updateAvatar = (req, res) => {
  console.log(res.body);
  User.findOneAndUpdate(
    { _id: new Types.ObjectId(req.params.id) },
    { avatar: req.body.avatar },
    { new: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};

export const deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: new Types.ObjectId(req.params.id) })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};
