const { Post, User } = require('../models');

const postController = {
  // Get all posts
  getAllPosts(req, res) {
    Post.findAll({
      attributes: ['id', 'title', 'content', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    })
      .then((postData) => {
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a single post by id
  getPostById(req, res) {
    Post.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    })
      .then((postData) => {
        if (!postData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        const post = postData.get({ plain: true });
        res.render('post', { post, loggedIn: req.session.loggedIn });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a new post
  createPost(req, res) {
    const { title, content } = req.body;

    Post.create({
      title,
      content,
      user_id: req.session.user_id,
    })
      .then((postData) => {
        const post = postData.get({ plain: true });
        res.redirect('/dashboard');
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a post by id
  updatePost(req, res) {
    const { title, content } = req.body;

    Post.update(
      { title, content },
      {
        where: { id: req.params.id },
      }
    )
      .then((result) => {
        if (result[0] === 0) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json({ message: 'Post updated successfully' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a post by id
  deletePost(req, res) {
    Post.destroy({
      where: { id: req.params.id },
    })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json({ message: 'Post deleted successfully' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = postController;
