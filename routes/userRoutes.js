const express = require('express');

const usersController = require("../controllers/usersController");
const verifyJWT = require("../middleware/verifyJWT");
const User = require('../models/userModel');

const route = express.Router();

// get users for admin
route.use(verifyJWT);
route.route("/").get(usersController.getAllUsers);

// update user
route.use(verifyJWT);
route.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try{
        const userExists = await User.findById(id);
        if (!userExists){
            return res.status(400).json({message: 'user not found'});
        }
        const userUpdate = await User.findByIdAndUpdate(id, {$set: updateData}, {new: true});
        res.status(200).json({message: 'user updated successfully'});
    }catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});

// return user by id
route.use(verifyJWT);
route.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const userExists = await User.findById(id).select('-password');
        if (!userExists){
            return res.status(400).json({message: 'user not found'});
        }
        res.status(200).json({user: userExists});
    }catch (error){
        res.status(400).json(error);
    }
});

// delete user
route.use(verifyJWT);
route.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const userExists = await User.findById(id).select('-password');
        if (!userExists){
            return res.status(400).json({message: 'user not found'});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'user deleted successfully'})
    }catch (error){
        res.status(400).json({error});
    }
});

module.exports = route;