const express = require('express');

const usersController = require("../controllers/usersController");
const verifyJWT = require("../middleware/verifyJWT");
const isAdmin = require('../middleware/isAdmin');

const route = express.Router();

// get users for admin
route.use(verifyJWT);
route.use(isAdmin);
route.route("/").get(usersController.getAllUsers);

// update user
route.use(verifyJWT);
route.route('/:id').put(usersController.updateUser);


// return user by id
route.use(verifyJWT);
route.route('/:id').get(usersController.getUserById);


// delete user
route.use(verifyJWT);
route.route('/:id').delete(usersController.deleteUserById);


module.exports = route;