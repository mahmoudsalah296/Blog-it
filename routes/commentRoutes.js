const route = require('express').Router();

const commentController = require('../controllers/commentController');
const verifyUserID = require("../middleware/verifyUserID");

// get all comments
route.route('/').get(commentController.getAllComments);

// get comment by id
route.route('/:id').get(commentController.getCommentById);

// get comments by post
route.route('/post/:id').get(commentController.getCommentByPost);

route.use(verifyUserID);

// create a comment
route.route('/create').post(commentController.createComment);

// update comment
route.route('/update/:id').put(commentController.updateCommentById);

// delete comment
route.route('/delete/:id').delete(commentController.deleteCommentsById);

module.exports = route;