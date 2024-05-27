const route = require('express').Router();
const commentController = require('../controllers/commentController');

// get all comments
route.route('/').get(commentController.getAllComments);

// get comment by id
route.route('/:id').get(commentController.getCommentById);

// create a comment 
route.route('/').post(commentController.createComment);

// update comment
route.route('/:id').put(commentController.updateCommentById);

// delete comment
route.route('/:id').delete(commentController.deleteCommentsById);

// get comment by post
route.route('/post/:id').get(commentController.getCommentByPost);


module.exports = route;