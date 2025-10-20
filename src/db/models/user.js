'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post);
      User.belongsToMany(models.User, {
        through: "Followers",
        as: "followers",
        foreignKey: "followedId"
      });
      User.belongsToMany(models.User, {
        through: "Followers",
        as: "following",
        foreignKey: "followerId"
      });
    }
  }
  User.init({
    nickName: { type: DataTypes.STRING, unique: true, allowNull: false }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};