const Comment = require('../models/commentModel');
const Post = require('../models/postModel');


const getAllComments =  async (req, res) => {
    try{
        const comments = await Comment.find();
        res.status(200).json({comments});
    }catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
};


const getCommentById = async (req, res) => {
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
};


const createComment = async (req, res) => {
    const { body, post } = req.body;
    const author = req.user;
    if(!body || !post) {
        res.status(400).json({message: 'Something goes wrong'})
    }
    try{
        const comment = new Comment({body, author, post});
        await comment.save();
        await Post.findByIdAndUpdate(comment.post, {$push: {comments: comment._id}}, {new: true});
        res.status(200).json({message: 'comment added successfully'});
    } catch (error){
        res.status(400).json({message: 'Something went wrong'});
    }
};


const updateCommentById = async (req, res) =>{
    const dataUpdate = req.body
    const id = req.params.id;
    try{
        const commentExists = await Comment.findById(id);
        if(!commentExists){
            return res.status(400).json({message: 'comment doesn\'t exists'});
        }

        if (commentExists.author.toString() === req.user) {
            await Comment.findByIdAndUpdate(id, {$set: dataUpdate}, {new: true});
            return res.status(200).json({message: 'comment updated successfully'});
        } else {
            return res.status(401).json({message: "Unauthorized"});
        }
    } catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
};


const deleteCommentsById = async (req, res) => {
    const { id } = req.params;
    try{
        const comment = await Comment.findById(id);
        if(!comment){
            return res.status(400).json({message: 'comment doesn\'t exists'});
        }

        if (comment.author.toString() === req.user) {
            await Comment.findByIdAndDelete(id);
            res.status(200).json({message: 'comment deleted successfully'})
        } else {
            return res.status(401).json({message: "Unauthorized"});
        }
    }catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
};

const getCommentByPost = async (req, res) => {
    const id = req.params.id
    try{
        const comments = await Comment.find({post: id});
        if (!comments){
            return res.status(400).json({message: 'comments not found'});
        }
        res.status(200).json({comments});
    }catch (error){
        res.status(400).json({message: 'db.Something goes wrong'});
    }
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateCommentById,
    deleteCommentsById,
    getCommentByPost
};