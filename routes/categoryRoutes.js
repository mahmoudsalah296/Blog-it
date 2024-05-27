const route = require('express').Router();
const categoryController = require('../controllers/categoryController');


// get all categories
route.route('/').get(categoryController.getAllCategories);

// get  category by id
route.route('/:id').get(categoryController.getCategoryById);


// create a category 
route.route('/').post(categoryController.createCategory);


// update category
route.route('/:id').put(categoryController.updateCategoryById);


// delete category
route.route('/:id').delete(categoryController.deleteCategoryById);


module.exports = route;