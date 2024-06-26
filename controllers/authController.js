const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  author: {
    user: process.env.GMAIL_USER,
    pass: process.env.PASS,
  },
});

const register = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const image = req.file ? req.file.filename : 'defaultImage.jpg';
  const bio = req.body.bio || null;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'please fill in the required fields.' });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (foundUser) {
    return res.status(401).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    profilePicture: image,
    bio: bio ? bio : null,
  });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: user._id,
        isAdmin: user.isAdmin ? user.isAdmin : false, // added
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    {
      UserInfo: {
        id: user._id,
        isAdmin: user.isAdmin ? user.isAdmin : false, // added
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('jwt', refreshToken, {
    // httpOnly:true,
    // secure: true,
    // sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  transporter.sendMail(
    {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
    },
    (error, info) => {
      if (error) {
        console.log(error);
      }
    }
  );

  res.json({
    accessToken,
    email: user.email,
    username: user.username,
    isAdmin: user.isAdmin ? user.isAdmin : false,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: 'User does not exist' });
  }

  const validPassword = await bcrypt.compare(password, foundUser.password);

  if (!validPassword) {
    return res.status(401).json({ message: 'Wrong password' });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
        isAdmin: foundUser.isAdmin ? foundUser.isAdmin : false, // added
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
        isAdmin: foundUser.isAdmin ? foundUser.isAdmin : false, // added
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('jwt', refreshToken, {
    // httpOnly:true,
    // secure: true,
    // sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({
    accessToken,
    email: foundUser.email,
    isAdmin: foundUser.isAdmin ? foundUser.isAdmin : false,
  });
};

const update = async (req, res) => {
  const id = req.user;
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
    res.status(200).json({ message: 'user updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};

const deleteProfile = async (req, res) => {
  const id = req.user;
  try {
    const userExists = await User.findById(id).select('-password');
    if (!userExists) {
      return res.status(400).json({ message: 'user not found' });
    }

    await Comment.deleteMany({ author: id });
    await Post.deleteMany({ author: id });
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'user deleted successfully' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const refresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const foundUser = await User.findById(decoded.UserInfo.id).exec();

      if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser._id,
            isAdmin: foundUser.isAdmin ? foundUser.isAdmin : false, // added
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken });
    }
  );
};

const logout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }

  res.clearCookie('jwt', {
    // httpOnly: true,
    // sameSite: "None",
    // secure: true
  });

  res.json({ message: 'cookie cleared' });
};

module.exports = {
  register,
  login,
  update,
  deleteProfile,
  refresh,
  logout,
};
