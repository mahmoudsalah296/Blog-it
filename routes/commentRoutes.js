const route = require('express').Router();
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

// get all comments
route.get('/', async (req, res) => {
    try{
        const comments = await Comment.find();
        res.status(200).json({comments});
    }catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});


// get comment by id
route.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const comment = await Comment.findById(id);
        if (!comment){
            return res.status(400).json({message: 'comment not found'});
        }
        res.status(200).json({comment});
    }catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});


// create a comment 
route.post('/', async (req, res) => {
    const commentData = req.body ? req.body : null;
    if(!commentData){
        res.status(400).json({message: 'Something goes wrong'})
    }
    try{
        const comment = new Comment(commentData);
        await comment.save();
        await Post.findByIdAndUpdate(comment.post, {$push: {comments: comment._id}}, {new: true});
        res.status(200).json({message: 'comment added successfully'});
    } catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});

// update category
route.put('/:id', async (req, res) =>{
    const dataUpdate = req.body
    const id = req.params.id;
    try{
        const commentExists = await Comment.findById(id);
        if(!commentExists){
            return res.status(400).json({message: 'comment doesn\'t exists'});
        }
        await Comment.findByIdAndUpdate(id, {$set: dataUpdate}, {new: true});
        return res.status(200).json({message: 'comment updated successfully'});
    } catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});


// delete category
route.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const comment = await Comment.findById(id);
        if(!comment){
            return res.status(400).json({message: 'comment doesn\'t exists'});
        }
        await Comment.findByIdAndDelete(id);
        res.status(200).json({message: 'comment deleted successfully'})
    }catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
});



module.exports = route;