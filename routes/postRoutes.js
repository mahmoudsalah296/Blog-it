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




module.exports = route;