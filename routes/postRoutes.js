const express = require('express');
const route = express.Router();
const Post = require('../models/postModel');
const postController = require('../controllers/postController');
const upload = require('../config/uploadImage');

// get all posts
route.route('/').get(postController.getAllPosts);

// get  post by id
route.route('/:id').get(postController.getPostById);


// create a post
route.route('/').post(upload.single('image'), postController.createPost);

// update post
route.route('/:id').put(postController.updatePostById);

// delete post
route.route('/:id').delete(postController.deletePostById);


module.exports = route;