const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');

// Home route
const getHomepage = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.render('homepage', { posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Dashboard route
const getDashboard = async (req, res) => {
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
};

// Login page route
const getLoginPage = (req, res) => {
  res.render('login');
};

// Signup page route
const getSignupPage = (req, res) => {
  res.render('signup');
};

module.exports = {
  getHomepage,
  getDashboard,
  getLoginPage,
  getSignupPage
};

