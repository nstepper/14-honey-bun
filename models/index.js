const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('honeybun', 'nstep', 'rain', {
  host: 'localhost',
  dialect: 'mysql',
});

const db = {};

// Read all model files in the current directory and import them
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    const modelName = model.name;
    db[modelName] = model;
  });

// Initialize the models and associate them if needed
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Expose the Sequelize instance and models
db.Sequelize = Sequelize;

module.exports = db;
