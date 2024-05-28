const express = require('express');

const usersController = require("../controllers/usersController");
const verifyAdmin = require('../middleware/verifyAdmin');

const route = express.Router();

// get users for admin
route.use(verifyAdmin);
route.route("/").get(usersController.getAllUsers);

// return user by id
route.use(verifyAdmin);
route.route('/:id').get(usersController.getUserById);

// delete user
route.use(verifyAdmin);
route.route('/:id').delete(usersController.deleteUserById);


module.exports = route;