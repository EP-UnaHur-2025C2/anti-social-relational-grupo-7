'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User);
      Post.hasMany(models.Post_Images);
      Post.hasMany(models.Comment);
      Post.belongsToMany(models.Tag, { through: "Post_Tag" });
    }
  }
  Post.init({
    description: { type: DataTypes.TEXT, allowNull: false },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};