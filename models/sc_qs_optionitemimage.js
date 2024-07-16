'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sc_qs_optionitemimage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.sz_qs_options, {foreignKey: 'szOptionId', as: 'OptionItemImages'})
      this.belongsTo(models.sc_qs_options, {foreignKey: 'szOptionId',  as: 'OptionItemImages'})
      this.belong
    }
  }
  sc_qs_optionitemimage.init({
    szOptionId: DataTypes.STRING,
    shItem: DataTypes.STRING,
    imgOption: DataTypes.BLOB,
    imgPath: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'sc_qs_optionitemimage',
    timestamps: false
  });
  return sc_qs_optionitemimage;
};