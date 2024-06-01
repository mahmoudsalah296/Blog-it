const Post = require('../models/postModel');
const Category = require('../models/categoryModel');

const createPost = async (req, res) => {
  const { title, body, categories, fileUrl } = req.body;
  const author = req.user;
  const image = req.file ? req.file.filename : 'defaultImage.jpg';
  if (!title || !body) {
    res.status(400).json({ message: 'Something went wrong' });
  }
  try {
    const category = await Category.findById(categories);
    const categoryName = category.name;
    const post = new Post({
      title,
      body,
      author,
      image,
      categories,
      fileUrl,
      categoryName,
    });
    await post.save();
    res.status(200).json({ message: 'post created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Something wentwrong' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ message: 'post not found' });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updatePostById = async (req, res) => {
  const dataUpdate = req.body;
  const id = req.params.id;
  try {
    const postExists = await Post.findById(id);
    if (!postExists) {
      return res.status(400).json({ message: "post doesn't exists" });
    }
    if (postExists.author.toString() === req.user) {
      await Post.findByIdAndUpdate(id, { $set: dataUpdate }, { new: true }); // be aware of update all , comments will be one comment
      return res.status(200).json({ message: 'post updated successfully' });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(400).json({ message: `Something went wrong ${error}` });
  }
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ message: "post doesn't exists" });
    }

    if (post.author.toString() === req.user) {
      await Post.findByIdAndDelete(id);
      return res.status(200).json({ message: 'post deleted successfully' });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};

const getPostByCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await Post.find({ categories: id });
    if (!posts) {
      return res.status(400).json({ message: 'posts not found' });
    }
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
  updatePostById,
  getPostByCategory,
};
