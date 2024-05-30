const express = require('express');

const postController = require('../controllers/postController');
const upload = require('../config/uploadImage');
const verifyUserID = require("../middleware/verifyUserID");

const route = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API endpoints for managing posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
route.route('/').get(postController.getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Post found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
route.route('/:id').get(postController.getPostById);

/**
 * @swagger
 * /posts/category/{id}:
 *   get:
 *     summary: Get posts by category
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category
 *     responses:
 *       200:
 *         description: List of posts under the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: Category not found
 */
route.route('/category/:id').get(postController.getPostByCategory);

route.use(verifyUserID);

/**
 * @swagger
 * /posts/create:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               fileUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post created successfully
 *       400:
 *         description: Error in creating post
 */
route.route('/create').post(upload.single('image'), postController.createPost);

/**
 * @swagger
 * /posts/update/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Error in updating post
 *       401:
 *         description: Unauthorized
 */
route.route('/update/:id').put(postController.updatePostById);

/**
 * @swagger
 * /posts/delete/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       400:
 *         description: Error in deleting post
 *       401:
 *         description: Unauthorized
 */
route.route('/delete/:id').delete(postController.deletePostById);

module.exports = route;
