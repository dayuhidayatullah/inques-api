"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_qs_questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      szQuestionId: {
        type: Sequelize.STRING,
      },
      szTrnId: {
        type: Sequelize.STRING,
      },
      szDescQuestion: {
        type: Sequelize.STRING,
      },
      decTargetVotes: {
        type: Sequelize.DECIMAL(8, 2),
      },
      bDuration: {
        type: Sequelize.TINYINT(1),
      },
      decDuration: {
        type: Sequelize.DECIMAL(8, 2),
      },
      dtmStart: {
        type: Sequelize.DATE,
      },
      dtmEnd: {
        type: Sequelize.DATE,
      },
      szAuthor: {
        type: Sequelize.STRING,
      },
      szNetworkId: {
        type: Sequelize.STRING,
      },
      szTerritoryId: {
        type: Sequelize.STRING,
      },
      bActive: {
        type: Sequelize.TINYINT(1),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sc_qs_questions");
  },
};
