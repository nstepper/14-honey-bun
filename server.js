const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const path = require('path');
const sequelize = require('./db/connection');
require('dotenv').config();


// Import controllers
const homeController = require('./controllers/homeController');
const postController = require('./controllers/postController');
const userController = require('./controllers/userController');

// Create the Express app
const app = express();
const PORT = process.env.PORT || 3000;

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
  handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
  })
);
app.set('view engine', 'handlebars');

// Parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', homeController.homepage);
app.get('/dashboard', homeController.dashboard);
app.get('/login', homeController.loginPage);
app.get('/signup', homeController.signupPage);
app.post('/create-post', postController.createPost);
app.post('/delete-post/:id', postController.deletePost);
app.post('/login', userController.login);
app.post('/signup', userController.signup);
app.get('/logout', userController.logout);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
