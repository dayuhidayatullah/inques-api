'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sc_qs_configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      szQuestionId: {
        type: Sequelize.STRING
      },
      szTrnId: {
        type: Sequelize.STRING
      },
      szIntroduction: {
        type: Sequelize.STRING
      },
      szInstruction: {
        type: Sequelize.STRING
      },
      szColorId: {
        type: Sequelize.STRING
      },
      szIssue: {
        type: Sequelize.STRING
      },
      szValidation: {
        type: Sequelize.STRING
      },
      szUserClass: {
        type: Sequelize.STRING
      },
      bMode: {
        type: Sequelize.TINYINT
      },
      szClosingNote: {
        type: Sequelize.STRING
      },
      imgIcon: {
        type: Sequelize.BLOB
      },
      bShowResult: {
        type: Sequelize.TINYINT
      },
      szDashboardNote: {
        type: Sequelize.STRING
      },
      szIconPath: {
        type: Sequelize.STRING
      },
      bAllowUpdate: {
        type: Sequelize.TINYINT
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
    await queryInterface.dropTable('sc_qs_configs');
  }
};