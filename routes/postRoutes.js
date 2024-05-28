const express = require('express');

const postController = require('../controllers/postController');
const upload = require('../config/uploadImage');
const verifyUserID = require("../middleware/verifyUserID");

const route = express.Router();

// get all posts
route.route('/').get(postController.getAllPosts);

// get  post by id
route.route('/:id').get(postController.getPostById);


// create a post
route.use(verifyUserID);
route.route('/create').post(upload.single('image'), postController.createPost);

// update post
route.use(verifyUserID);
route.route('/update/:id').put(postController.updatePostById);

// delete post
route.use(verifyUserID);
route.route('/delete/:id').delete(postController.deletePostById);

// get  posts by category
route.route('/category/:id').get(postController.getPostByCategory);

module.exports = route;