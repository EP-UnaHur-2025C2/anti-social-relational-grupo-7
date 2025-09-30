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
      Post.belongsTo(User);
      Post.hasMany(PostImage);
      Post.hasMany(Comment);
      Post.belongsToMany(Tag, { through: "Post_Tag" });
    }
  }
  Post.init({
    description: { type: DataTypes.TEXT, allowNull: false }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};