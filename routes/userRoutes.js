const express = require('express');
const route = express.Router();
const User = require('../models/userModel');
// const sha1 = require('sha1');

// create user
route.post('/', async (req, res) => {
    try{
        const userData = req.body;
        const user = new User(userData);
        await user.save()
        res.status(201).json({message: 'user created successfully '});
    }catch (error){
        res.status(400).json(error);
    }
});

// get users for admin
route.get('/', async (req, res) => {
    try{
        const users = await User.find().select('-password');
        res.status(200).json(users);
    }catch (error){
        res.status(400).json(error);
    }
});

// update user
route.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    // console.log(updateData);// {}
    try{
        const userUpdate = await User.findByIdAndUpdate(id, {$set: updateData}, {new: true});
        res.status(200).json({message: 'user updated successfully'});
    }catch (error){
        res.status(400).json(error);
    }
});


module.exports = route;