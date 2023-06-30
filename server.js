const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
require('dotenv').config();


// Import controllers
const homeController = require('./controllers/homeController');
const postController = require('./controllers/postController');
const userController = require('./controllers/userController');

// Create the Express app
const app = express();
const PORT = process.env.PORT || 3003;


// Set up session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

// Set up handlebars as the view engine
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
  })
);
app.set('view engine', 'handlebars');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

//Set the mimetype for CSS
app.get('/public/style.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'public', 'style.css'));
});
//Set the mimetype for JS
app.get('/public/index.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(path.join(__dirname, 'public', 'index.js'));
});

//Set the mimetype for JS
app.get('/dist/bundle.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(path.join(__dirname, 'dist', 'bundle.js'));
});
// Parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes with callbacks
app.get('/', (req, res) => {
  homeController.getHomepage(req, res);
});

app.get('/dashboard', (req, res) => {
  homeController.getDashboard(req, res);
  res.render('dashboard');
});

app.get('/login', (req, res) => {
  homeController.getLoginPage(req, res);
  res.render('login');
});

app.get('/signup', (req, res) => {
  homeController.getSignupPage(req, res);
  res.render('signup');
});

app.post('/create-post', (req, res) => {
  postController.createPost(req, res);
  res.render('create-post');
});

app.post('/delete-post/:id', (req, res) => {
  postController.deletePost(req, res);
  res.render('delete-post');
});

app.post('/login', (req, res) => {
  userController.loginUser(req, res);
  res.render('login');
});

app.post('/signup', (req, res) => {
  userController.createUser(req, res);
  res.render('signup');
});

app.get('/logout', (req, res) => {
  userController.logoutUser(req, res);
  res.render('logout');
});

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
