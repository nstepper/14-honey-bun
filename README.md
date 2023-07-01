# Honey Bun Project

Welcome to the Honey Bun project! This is a web application built using Node.js, Express.js, and Sequelize ORM.

## Project Overview

The Honey Bun project is a simple blogging platform where users can create and publish their blog posts. It provides basic CRUD (Create, Read, Update, Delete) operations for managing blog posts.

## Project Structure

The project follows the MVC (Model-View-Controller) architecture for organizing the codebase. Here's an overview of the project structure:

- `controllers/`: Contains the controller files responsible for handling incoming requests and defining the application's routes.
- `models/`: Contains the Sequelize model files that define the database schema and handle interactions with the database.
- `views/`: Contains the view files responsible for rendering HTML templates and displaying the data.
- `public/`: Contains static assets such as CSS stylesheets, images, and client-side JavaScript files.
- `config/`: Contains configuration files for the project, including the database configuration.
- `server.js`: The main entry point of the application. It sets up the server, establishes database connections, and starts listening for incoming requests.

## Prerequisites

Before running the project, make sure you have the following prerequisites installed on your system:

- Node.js (v12 or higher)
- MySQL database

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/nstepper/14-honey-bun`
2. Navigate to the project directory: `cd honey-bun`
3. Install the dependencies: `npm install`
4. Configure the database connection: Open `config/config.json` and update the database credentials accordingly.
5. Create the database: Run the SQL script provided in `database.sql` to create the required database and tables.
6. Start the server: `npm start`
7. Open your browser and visit: `http://localhost:3000`

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

