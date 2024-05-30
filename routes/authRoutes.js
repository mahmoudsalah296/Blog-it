const express = require('express');
const path = require('path');
const upload = require('../config/uploadImage');

const authController = require("../controllers/authController")
const verifyUserID = require("../middleware/verifyUserID");

const router = express.Router();

router.route("/register").post(upload.single('image'), authController.register);
router.route("/login").post(authController.login);

router.use(verifyUserID);

router.route("/update/me").put(authController.update);
router.route("/delete/me").delete(authController.deleteProfile);
router.route("/refresh").get(authController.refresh);
router.route("/logout").post(authController.logout);

module.exports = router;