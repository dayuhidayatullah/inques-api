'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sc_tr_answer_items', {
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
      szUsername: {
        type: Sequelize.STRING
      },
      szQuestionId: {
        type: Sequelize.STRING
      },
      szTrnId: {
        type: Sequelize.STRING
      },
      shItem: {
        type: Sequelize.NUMBER
      },
      shItemNumber: {
        type: Sequelize.NUMBER
      },
      szAnswer: {
        type: Sequelize.STRING
      },
      decScore: {
        type: Sequelize.DECIMAL
      },
      szNlgValueLogic: {
        type: Sequelize.STRING
      },
      szValueId: {
        type: Sequelize.STRING
      },
      szVariableId: {
        type: Sequelize.STRING
      },
      szNode1: {
        type: Sequelize.STRING
      },
      szNode2: {
        type: Sequelize.STRING
      },
      decNorma: {
        type: Sequelize.NUMBER
      },
      shItemAnswerKey: {
        type: Sequelize.NUMBER
      },
      szAnswerKey: {
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
    await queryInterface.dropTable('sc_tr_answer_items');
  }
};