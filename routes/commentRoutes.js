const route = require('express').Router();
const commentController = require('../controllers/commentController');

// get all comments
route.route('/').get(commentController.getAllComments);

// get comment by id
route.route('/:id').get(commentController.getCommentById);

// create a comment 
route.route('/').post(commentController.createComment);

// update category
route.route('/:id').post(commentController.updateCommentById);

// delete category
route.route('/:id').delete(commentController.deleteCommentsById);


module.exports = route;