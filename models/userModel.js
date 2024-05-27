const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false, default: 'defaultImage.jpg' },
  bio: { type: String, required: false, default: '' },
  isAdmin: {type: Boolean, default: false},
}, { timestamps: true });

const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;
