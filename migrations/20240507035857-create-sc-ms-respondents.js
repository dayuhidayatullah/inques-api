"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_ms_respondents", {
      szQuestionId: {
        type: Sequelize.STRING,
      },
      szTerritoryId: {
        type: Sequelize.STRING,
      },
      szEmailRespondent: {
        type: Sequelize.STRING,
      },
      szUsernameRespondent: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      szPassword: {
        type: Sequelize.STRING,
      },
      szFullName: {
        type: Sequelize.STRING,
      },
      szPhone: {
        type: Sequelize.STRING,
      },
      szNIK: {
        type: Sequelize.STRING,
      },
      szDivision: {
        type: Sequelize.STRING,
      },
      szPosition: {
        type: Sequelize.STRING,
      },
      szPersonnelArea: {
        type: Sequelize.STRING,
      },
      dtmBirthDay: {
        type: Sequelize.DATE,
      },
      dtmStartofWork: {
        type: Sequelize.DATE,
      },
      szAddress: {
        type: Sequelize.STRING,
      },
      szCountry: {
        type: Sequelize.STRING,
      },
      szProvince: {
        type: Sequelize.STRING,
      },
      szCity: {
        type: Sequelize.STRING,
      },
      szDistrict: {
        type: Sequelize.STRING,
      },
      szSubDistrict: {
        type: Sequelize.STRING,
      },
      decPostalCode: {
        type: Sequelize.DECIMAL(8, 2),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sc_ms_respondents");
  },
};
