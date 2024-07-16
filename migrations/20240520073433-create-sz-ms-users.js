'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sz_ms_users', {
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
      szEmail: {
        type: Sequelize.STRING
      },
      szUsername: {
        type: Sequelize.STRING
      },
      szPassword: {
        type: Sequelize.STRING
      },
      szFullName: {
        type: Sequelize.STRING
      },
      szPhone: {
        type: Sequelize.STRING
      },
      bStatus: {
        type: Sequelize.TINYINT
      },
      bManager: {
        type: Sequelize.TINYINT
      },
      bSuperAdmin: {
        type: Sequelize.TINYINT
      },
      szAuthor: {
        type: Sequelize.STRING
      },
      bSuperMaster: {
        type: Sequelize.TINYINT
      },
      id: {
        type: Sequelize.NUMBER
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
    await queryInterface.dropTable('sz_ms_users');
  }
};