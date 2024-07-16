'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sc_qs_optionitems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.sc_qs_options, {foreignKey: 'szOptionId',  as: 'OptionItems', })
      // this.belongsTo(models.sc_qs_question_items, {foreignKey: 'szOptionId',  as: 'OptionItems1', })
      this.hasOne(models.sc_qs_optionitemimage, {foreignKey: 'szOptionId', sourceKey: 'szOptionId', as: 'OptionImage'})

    }
  }
  sc_qs_optionitems.init({
    szOptionId: DataTypes.STRING,
    shItem: DataTypes.NUMBER,
    bImageOption: DataTypes.TINYINT,
    decOptionScore: DataTypes.DECIMAL,
    szValueId: DataTypes.STRING,
    szOption: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sc_qs_optionitems',
    timestamps: false
  });
  return sc_qs_optionitems;
};