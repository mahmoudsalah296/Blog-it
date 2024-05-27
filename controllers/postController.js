const Post = require('../models/postModel')

const createPost = async (req, res) => {
    const { title, body, author , categories} = req.body;
    const image = req.file ? req.file.filename : 'defaultImage.jpg';
    if(!title || !body || !author){
        res.status(400).json({message: 'Something goes wrong'})
    }
    try{
        const post = new Post({ title, body, author, image , categories});
        // const post = new Post(postData);
        await post.save();
        res.status(200).json({message: 'post created successfully'});
    } catch (error){
        res.status(400).json({message: `db.Something goes wrong ${error}`});
    }
};


const getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json({posts});
    }catch (error){
        res.status(400).json({error});
    }
};

const getPostById = async (req, res) => {
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
};


const updatePostById = async (req, res) =>{
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
};


const deletePostById = async (req, res) => {
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
};

const getPostByCategory = async (req, res) => {
    const id = req.params.id
    try{
        const posts = await Post.find({categories: id});
        if (!posts){
            return res.status(400).json({message: 'posts not found'});
        }
        res.status(200).json({posts});
    }catch (error){
        res.status(400).json({error});
    }
};


module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    deletePostById,
    updatePostById,
    getPostByCategory
};
