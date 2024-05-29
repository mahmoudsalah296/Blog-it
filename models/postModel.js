const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  //createdAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  image: {type: String, require: false, default: "defaultImage.jpg"}
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema, 'post');

module.exports = Post;
