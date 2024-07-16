'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sc_tr_answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      szNetworkId: {
        type: Sequelize.STRING
      },
      szTerritoryId: {
        type: Sequelize.STRING
      },
      szEmailRespondent: {
        type: Sequelize.STRING
      },
      szUsernameRespondent: {
        type: Sequelize.STRING
      },
      szQuestionId: {
        type: Sequelize.STRING
      },
      szTrnId: {
        type: Sequelize.STRING
      },
      decDuration: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sc_tr_answers');
  }
};