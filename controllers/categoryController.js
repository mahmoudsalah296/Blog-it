const Category = require('../models/categoryModel');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ message: 'db.Something goes wrong' });
  }
};

const getCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({ message: 'category not found' });
    }
    res.status(200).json({ category });
  } catch (error) {
    res.status(400).json({ message: 'db.Something goes wrong' });
  }
};

const createCategory = async (req, res) => {
  const categoryData = req.body ? req.body : null;
  if (!categoryData) {
    res.status(400).json({ message: 'Something goes wrong' });
  }
  try {
    const category = new Category(categoryData);
    await category.save();
    res.status(200).json({ message: 'category created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'db.Something goes wrong' });
  }
};

const updateCategoryById = async (req, res) => {
  const dataUpdate = req.body;
  const id = req.params.id;
  try {
    const categoryExists = await Category.findById(id);
    if (!categoryExists) {
      return res.status(400).json({ message: "category doesn't exists" });
    }
    await Category.findByIdAndUpdate(id, { $set: dataUpdate }, { new: true });
    return res.status(200).json({ message: 'category updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'db.Something goes wrong' });
  }
};

const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({ message: "category doesn't exists" });
    }
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'category deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'db.Something goes wrong' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};
