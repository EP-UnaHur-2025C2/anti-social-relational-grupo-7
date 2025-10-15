'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Post_Images', 'postId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Post_Images', 'postId');
  }
};

