'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sc_qs_answerstyletypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sc_qs_answerstyletypes.init({
    szAnswerStyleId: DataTypes.STRING,
    szAnswerStyleTypeId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sc_qs_answerstyletypes',
    timestamps: false
  });
  return sc_qs_answerstyletypes;
};