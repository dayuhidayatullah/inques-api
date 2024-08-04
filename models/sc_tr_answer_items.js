'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sc_tr_answeritems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sc_tr_answeritems.init({
    szNetworkId: DataTypes.STRING,
    szTerritoryId: DataTypes.STRING,
    szEmailRespondent: DataTypes.STRING,
    szUsername: DataTypes.STRING,
    szQuestionId: DataTypes.STRING,
    szTrnId: DataTypes.STRING,
    shItem: DataTypes.NUMBER,
    shItemNumber: DataTypes.NUMBER,
    szAnswer: DataTypes.STRING,
    decScore: DataTypes.DECIMAL,
    szNlgValueLogic: DataTypes.STRING,
    szValueId: DataTypes.STRING,
    szVariableId: DataTypes.STRING,
    szNode1: DataTypes.STRING,
    szNode2: DataTypes.STRING,
    decNorma: DataTypes.NUMBER,
    shItemAnswerKey: DataTypes.NUMBER,
    szAnswerKey: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sc_tr_answeritems',
    timestamps: false,

  });
  return sc_tr_answeritems;
};