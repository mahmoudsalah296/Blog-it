const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String , required: false, default: ''},
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;
