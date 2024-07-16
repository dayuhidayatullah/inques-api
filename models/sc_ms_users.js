'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sc_ms_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sc_ms_users.init({
    szNetworkId: DataTypes.STRING,
    szTerritoryId: DataTypes.STRING,
    szEmail: DataTypes.STRING,
    szUsername: DataTypes.STRING,
    szPassword: DataTypes.STRING,
    szFullName: DataTypes.STRING,
    szPhone: DataTypes.STRING,
    bStatus: DataTypes.TINYINT,
    bManager: DataTypes.TINYINT,
    bSuperAdmin: DataTypes.TINYINT,
    szAuthor: DataTypes.STRING,
    bSuperMaster: DataTypes.TINYINT,
    id: {type:DataTypes.NUMBER, primaryKey: true}
  }, {
    sequelize,
    modelName: 'sc_ms_users',
    timestamps: false
  });
  return sc_ms_users;
};