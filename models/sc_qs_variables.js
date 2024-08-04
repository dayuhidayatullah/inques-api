'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sc_qs_variables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sc_qs_variables.init({
    szNetworkId: DataTypes.STRING,
    szTerritoryId: DataTypes.STRING,
    szVariableId: DataTypes.STRING,
    szNode1: DataTypes.STRING,
    szNode2: DataTypes.STRING,
    decNorma: DataTypes.DECIMAL,
    szAuthor: DataTypes.STRING,
    decScale: DataTypes.DECIMAL,
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  }, {
    sequelize,
    modelName: 'sc_qs_variables',
    
  });
  return sc_qs_variables;
};