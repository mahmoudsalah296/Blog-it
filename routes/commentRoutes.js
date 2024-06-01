const express = require('express');
const commentController = require('../controllers/commentController');
const verifyUserID = require('../middleware/verifyUserID');

const route = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
route.route('/').get(commentController.getAllComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */
route.route('/:id').get(commentController.getCommentById);

/**
 * @swagger
 * /comments/post/{id}:
 *   get:
 *     summary: Get comments by post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: List of comments for the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
route.route('/post/:id').get(commentController.getCommentByPost);

route.use(verifyUserID);

/**
 * @swagger
 * /comments/create:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               post:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment created successfully
 *       400:
 *         description: Error in creating comment
 */
route.route('/create').post(commentController.createComment);

/**
 * @swagger
 * /comments/update/{id}:
 *   put:
 *     summary: Update comment by ID
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Error in updating comment
 */
route.route('/update/:id').put(commentController.updateCommentById);

/**
 * @swagger
 * /comments/delete/{id}:
 *   delete:
 *     summary: Delete comment by ID
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       400:
 *         description: Error in deleting comment
 */
route.route('/delete/:id').delete(commentController.deleteCommentsById);

module.exports = route;
