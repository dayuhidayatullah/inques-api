'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sc_qs_optionitemlgs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      szOptionId: {
        type: Sequelize.STRING
      },
      shItem: {
        type: Sequelize.STRING
      },
      decNlgFrom: {
        type: Sequelize.DECIMAL
      },
      decNlgTo: {
        type: Sequelize.STRING
      },
      szNlgValueLogic: {
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
    await queryInterface.dropTable('sc_qs_optionitemlgs');
  }
};