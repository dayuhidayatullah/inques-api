'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sc_qs_options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      szOptionId: {
        type: Sequelize.STRING
      },
      szDescOption: {
        type: Sequelize.STRING
      },
      bSelection: {
        type: Sequelize.TINYINT
      },
      bMultiple: {
        type: Sequelize.TINYINT
      },
      bPrioritas: {
        type: Sequelize.TINYINT
      },
      bRating: {
        type: Sequelize.TINYINT
      },
      bNumberLogic: {
        type: Sequelize.TINYINT
      },
      szAnswerStyleTypeId: {
        type: Sequelize.STRING
      },
      decRatingScale: {
        type: Sequelize.DECIMAL
      },
      szRatingNode1: {
        type: Sequelize.STRING
      },
      szRatingNode2: {
        type: Sequelize.STRING
      },
      szAuthor: {
        type: Sequelize.STRING
      },
      szNetworkId: {
        type: Sequelize.STRING
      },
      szTerritoryId: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('sc_qs_options');
  }
};