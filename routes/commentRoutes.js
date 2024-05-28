const route = require('express').Router();

const commentController = require('../controllers/commentController');
const verifyUserID = require("../middleware/verifyUserID");

// get all comments
route.route('/').get(commentController.getAllComments);

// get comment by id
route.route('/:id').get(commentController.getCommentById);

// create a comment 
route.use(verifyUserID);
route.route('/create').post(commentController.createComment);

// update comment
route.use(verifyUserID);
route.route('/update/:id').put(commentController.updateCommentById);

// delete comment
route.use(verifyUserID);
route.route('/delete/:id').delete(commentController.deleteCommentsById);

// get comment by post
route.route('/post/:id').get(commentController.getCommentByPost);


module.exports = route;