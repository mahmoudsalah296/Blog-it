const express = require('express');
const route = express.Router();
const Post = require('../models/postModel')

// get all posts
route.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json({posts});
    }catch (error){
        res.status(400).json({error});
    }
});


// get  post by id
route.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const post = await Post.findById(id);
        if (!post){
            return res.status(400).json({message: 'post not found'});
        }
        res.status(200).json({post});
    }catch (error){
        res.status(400).json({error});
    }
});


// create a post 
route.post('/', async (req, res) => {
    const postData = req.body ? req.body : null;
    if(!postData){
        res.status(400).json({message: 'Something goes wrong'})
    }
    try{
        const post = new Post(postData);
        await post.save();
        res.status(200).json({message: 'post created successfully'});
    } catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});

// update post
route.put('/:id', async (req, res) =>{
    const dataUpdate = req.body
    const id = req.params.id;
    try{
        const postExists = await Post.findById(id);
        if(!postExists){
            return res.status(400).json({message: 'post doesn\'t exists'});
        }
        await Post.findByIdAndUpdate(id, {$set: dataUpdate}, {new: true}); // be aware of update all , comments will be one comment 
        return res.status(200).json({message: 'post updated successfully'});
    } catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});

// delete post
route.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const post = await Post.findById(id);
        if(!post){
            return res.status(400).json({message: 'post doesn\'t exists'});
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({message: 'post deleted successfully'})
    }catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});

module.exports = route;