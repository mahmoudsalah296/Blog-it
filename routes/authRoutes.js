const express = require('express');
const path = require('path');
const upload = require('../config/uploadImage');

const authController = require('../controllers/authController');
const verifyUserID = require('../middleware/verifyUserID');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 isAdmin:
 *                   type: boolean
 *       400:
 *         description: Error in registration
 */
router.route('/register').post(upload.single('image'), authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in with existing credentials
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 email:
 *                   type: string
 *                 isAdmin:
 *                   type: boolean
 *       400:
 *         description: Error in login
 */
router.route('/login').post(authController.login);

router.use(verifyUserID);

/**
 * @swagger
 * /auth/update/me:
 *   put:
 *     summary: Update user profile
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Error in updating profile
 */
router.route('/update/me').put(authController.update);

/**
 * @swagger
 * /auth/delete/me:
 *   delete:
 *     summary: Delete user profile
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile deleted successfully
 *       400:
 *         description: Error in deleting profile
 */
router.route('/delete/me').delete(authController.deleteProfile);

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       401:
 *         description: Unauthorized
 */
router.route('/refresh').get(authController.refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cookie cleared
 *       204:
 *         description: No content
 */
router.route('/logout').post(authController.logout);

module.exports = router;
