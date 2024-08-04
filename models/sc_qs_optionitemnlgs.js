'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sc_qs_optionitemnlgs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sc_qs_optionitemnlgs.init({
    szOptionId: DataTypes.STRING,
    shItem: DataTypes.STRING,
    decNlgFrom: DataTypes.DECIMAL,
    decNlgTo: DataTypes.STRING,
    szNlgValueLogic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sc_qs_optionitemnlgs',
    timestamps: false
  });
  return sc_qs_optionitemnlgs;
};