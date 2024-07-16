'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sc_qs_options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.sc_qs_optionitems, {foreignKey: 'szOptionId',  as: 'OptionItems', sourceKey: 'szOptionId'})
      this.belongsTo(models.sc_qs_question_items, {foreignKey: 'szOptionId'})
      this.hasMany(models.sc_qs_optionitemimage, {foreignKey: 'szOptionId',  as: 'OptionItemsImage', sourceKey: 'szOptionId'})
    
    }
  }
  sc_qs_options.init({
    szOptionId: DataTypes.STRING,
    szDescOption: DataTypes.STRING,
    bSelection: DataTypes.TINYINT,
    bMultiple: DataTypes.TINYINT,
    bPrioritas: DataTypes.TINYINT,
    bRating: DataTypes.TINYINT,
    bNumberLogic: DataTypes.TINYINT,
    szAnswerStyleTypeId: DataTypes.STRING,
    decRatingScale: DataTypes.DECIMAL,
    szRatingNode1: DataTypes.STRING,
    szRatingNode2: DataTypes.STRING,
    szAuthor: DataTypes.STRING,
    szNetworkId: DataTypes.STRING,
    szTerritoryId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sc_qs_options',
    timestamps: false
  });
  return sc_qs_options;
};