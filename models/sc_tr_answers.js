'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sc_tr_answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sc_tr_answers.init({
    szNetworkId: DataTypes.STRING,
    szTerritoryId: DataTypes.STRING,
    szEmailRespondent: DataTypes.STRING,
    szUsernameRespondent: DataTypes.STRING,
    szQuestionId: DataTypes.STRING,
    szTrnId: DataTypes.STRING,
    decDuration: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'sc_tr_answers',
  });
  return sc_tr_answers;
};