const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

// Home route
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.render('homepage', { posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.user) {
      res.redirect('/login');
      return;
    }

    const posts = await Post.findAll({ where: { userId: req.session.user.id }, include: User });
    res.render('dashboard', { user: req.session.user, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
