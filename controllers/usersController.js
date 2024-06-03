const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').lean();

  if (!users.length) {
    return res.status(400).json({ message: 'No users found' });
  }

  res.json(users);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(400).json({ message: 'user not found' });
    }
    const userUpdate = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!userUpdate) {
      return res.status(400).json({ message: 'Update failed' });
    }
    res.status(200).json({ message: 'user updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userExists = await User.findById(id).select('-password');
    if (!userExists) {
      return res.status(400).json({ message: 'user not found' });
    }
    res.status(200).json({ user: userExists });
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userExists = await User.findById(id).select('-password');
    if (!userExists) {
      return res.status(400).json({ message: 'user not found' });
    }

    // Delete user's comments
    await Comment.deleteMany({ author: id });

    // Find all posts by the user
    const userPosts = await Post.find({ author: id });

    // Delete all comments of user's posts
    for (const post of userPosts) {
      await Comment.deleteMany({ post: post._id });
    }

    // Delete user's posts
    await Post.deleteMany({ author: id });

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'user deleted successfully' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  getUserById,
  deleteUserById,
};
