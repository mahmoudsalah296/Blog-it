const express = require('express');
const path = require('path');

const authController = require("../controllers/authController")
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router.use(verifyJWT);
router.route("/update/me").put(authController.update);

router.route("/refresh").get(authController.refresh);
router.route("/logout").post(authController.logout);

module.exports = router;