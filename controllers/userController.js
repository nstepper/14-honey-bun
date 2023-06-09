const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create user
const createUser = async (req, res) => {
  try {
    // Create a new user
    const newUser = await User.create(req.body);

    // Store the user ID in the session
    req.session.userId = newUser.id;
    req.session.loggedIn = true;

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    // Find a user with matching username
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      res.status(400).json({ message: 'User not found!' });
      return;
    }

    // Verify the password
    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    // Store the user ID in the session
    req.session.userId = user.id;
    req.session.loggedIn = true;

    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Logout user
const logoutUser = (req, res) => {
  // Clear the session data
  req.session.destroy(() => {
    res.status(200).json({ message: 'Logout successful!' });
  });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser
};
