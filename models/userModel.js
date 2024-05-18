const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // profilePicture: { type: String },
  // bio: { type: String },
  joinedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
