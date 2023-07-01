// models/Comment.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post');

class Comment extends Model {
  checkContent() {
    // Implement any content validation logic here
    if (this.content.length > 500) {
        throw new Error('Comment content cannot exceed 500 characters.');
      }
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
  }
);

// Define associations
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = Comment;
