const express = require('express');
const path = require('path');

const authController = require("../controllers/authController")

const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/refresh").get(authController.refresh);
router.route("/logout").post(authController.logout);

module.exports = router;