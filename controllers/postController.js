const express = require('express');
const Post = require('../models/post');

// Create post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content });
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.destroy({ where: { id: postId } });
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createPost,
  deletePost
};
