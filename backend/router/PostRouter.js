const express = require('express');
const router = express.Router();
const Post = require('../models/PostModel');

const upload = require('../middleware/upload.js');
const fs = require('fs');
const path = require('path');



///const getPublicId = (imageUrl) => {
  //const parts = imageUrl.split('/');
  //const publicIdWithExtension = parts.slice(-2).join('/');
  //const publicID = publicIdWithExtension.split('.')[0];
  //return publicID;
//}

// Create Post
router.post('/', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      // Continue without image if upload fails
      req.file = null;
    }
    next();
  });
}, async (req, res) => {
  try {
    const { title, author, content, category } = req.body;
    
    if (!title || !author || !content) {
      return res.status(400).json({ error: 'Title, author, and content are required' });
    }
    
    const imageUrl = req.file ? req.file.path : '';
    const post = await Post.create({ title, author, content, category, imageUrl });
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
});

// Get All Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Update Post
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, author, content, category } = req.body;
    const updateData = { title, author, content, category };
    
    if (req.file) {
      updateData.imageUrl = req.file.path;
    }
    
    const post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Like Post
router.post('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    post.likes = (post.likes || 0) + 1;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// Delete Post
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;