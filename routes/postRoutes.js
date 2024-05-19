const express = require('express');
const route = express.Router();
const Post = require('../models/postModel')

// get all post
route.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json({posts});
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
        res.status(400).json({error});
    }
});


module.exports = route;