const route = require('express').Router();

const categoryController = require('../controllers/categoryController');
const verifyAdmin = require("../middleware/verifyAdmin");

// get all categories
route.route('/').get(categoryController.getAllCategories);

// get category by id
route.route('/:id').get(categoryController.getCategoryById);

// create a category 
route.use(verifyAdmin);
route.route('/create').post(categoryController.createCategory);

// update category
route.use(verifyAdmin);
route.route('/update/:id').put(categoryController.updateCategoryById);

// delete category
route.use(verifyAdmin);
route.route('/delete/:id').delete(categoryController.deleteCategoryById);

module.exports = route;