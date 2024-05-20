const route = require('express').Router();
const Category = require('../models/categoryModel')


// get all categories
route.get('/', async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json({categories});
    }catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});


// get  category by id
route.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const category = await Category.findById(id);
        if (!category){
            return res.status(400).json({message: 'category not found'});
        }
        res.status(200).json({category});
    }catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});


// create a category 
route.post('/', async (req, res) => {
    const categoryData = req.body ? req.body : null;
    if(!categoryData){
        res.status(400).json({message: 'Something goes wrong'})
    }
    try{
        const category = new Category(categoryData);
        await category.save();
        res.status(200).json({message: 'category created successfully'});
    } catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});

// update category
route.put('/:id', async (req, res) =>{
    const dataUpdate = req.body
    const id = req.params.id;
    try{
        const categoryExists = await Category.findById(id);
        if(!categoryExists){
            return res.status(400).json({message: 'category doesn\'t exists'});
        }
        await Category.findByIdAndUpdate(id, {$set: dataUpdate}, {new: true});
        return res.status(200).json({message: 'category updated successfully'});
    } catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});


// delete category
route.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const category = await Category.findById(id);
        if(!category){
            return res.status(400).json({message: 'category doesn\'t exists'});
        }
        await Category.findByIdAndDelete(id);
        res.status(200).json({message: 'category deleted successfully'})
    }catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});



module.exports = route;